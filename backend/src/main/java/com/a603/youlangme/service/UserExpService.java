package com.a603.youlangme.service;

import com.a603.youlangme.advice.exception.DataNotFoundException;
import com.a603.youlangme.advice.exception.UserNotFoundException;
import com.a603.youlangme.dto.user.UserExpLevelResponseDto;
import com.a603.youlangme.entity.User;
import com.a603.youlangme.entity.UserExp;
import com.a603.youlangme.entity.log.ExpAcquisitionLog;
import com.a603.youlangme.entity.meta.ExpActivity;
import com.a603.youlangme.entity.meta.Level;
import com.a603.youlangme.enums.ExpUpdateType;
import com.a603.youlangme.repository.*;
import com.a603.youlangme.repository.log.ExpLogRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class UserExpService {

    private final UserRepository userRepository;
    private final UserExpRepository userExpRepository;
    private final ExpLogRepository expLogRepository;
    private final LevelRepository levelRepository;

    //CachePut은 캐시 데이터가 존재해도 항상 메서드 로직을 수행한다.
    // 경험치, 레벨 검증에 필요한 "로그기반 재계산 연산을 줄이기 위해" 캐싱된 경험치-레벨 캐시에 추가된 경험치를 더해서 저장한다.
    @Transactional
    @CachePut(value="ExpLevel", key="#loginUser.getId()" , cacheManager = "expLevelCacheManager")
    public UserExpLevelResponseDto addExp(ExpUpdateType expUpdateType, User loginUser, ExpActivity activity, Integer multiBase) {

        // 경험치 업데이트 (레벨도 같이 업데이트)
        UserExp userExpToUpdate = userExpRepository.findByUser(loginUser).orElseThrow(UserNotFoundException::new);
        // 획득할 경험치
        Integer expToAdd = 0;
        // 경험치 계산 방식에 따라 획득 경험치 결정
        if (expUpdateType.equals(ExpUpdateType.ADD)) {
            expToAdd = activity.getExp();
        } else if (expUpdateType.equals(ExpUpdateType.MULTI)) {
            expToAdd = activity.getExp() * multiBase;
        }

        // DB UserExp 업데이트
        // 경험치 업데이트 (기존 경험치에 더해준다.)
        Integer newExp = userExpToUpdate.addExp(expToAdd);
        // 레벨 계산
        Level levelResult = levelRepository.findByMinExpLessThanEqualAndMaxExpGreaterThanEqual(newExp, newExp);
        // 레벨 업데이트
        if (!userExpToUpdate.getLevel().equals(levelResult)) {
            userExpToUpdate.updateLevel(levelResult);
        }

        // Redis 캐시 업데이트

        // 캐시 업데이트에 사용
        return UserExpLevelResponseDto.builder()
                .exp(userExpToUpdate.getExp())
                .levelId(userExpToUpdate.getLevel().getId())
                .levelName(userExpToUpdate.getLevel().getName())
                .build();
    }

    // 경험치 조회 시 로그 기반 검증에 연산이 많이 필요하므로 캐싱 처리를 한다.
    @Transactional
    @Cacheable(value="ExpLevel", key="{#userId}", cacheManager = "expLevelCacheManager")
    public UserExpLevelResponseDto getExpAndLevel(Long userId) {

        // User를 JOIN 하지 않고 로직 수행하기

        //User user = userRepository.findById(userId).orElseThrow(UserNotFoundException::new);
        User user = userRepository.getReferenceById(userId);

        // 경험치 검증(재계산)
        List<ExpAcquisitionLog> expLogs = expLogRepository.findAllByUser(user);

        List<Integer> exps = expLogs.stream()
                .map(expLog -> {
                    Integer expData = expLog.getActivity().getExp();
                    ExpUpdateType expUpdateType = expLog.getActivity().getExpUpdateType();
                    if(expUpdateType.equals(ExpUpdateType.ADD))
                        return expData;
                    else if(expUpdateType.equals(ExpUpdateType.MULTI))
                        return expData * expLog.getMultiBase();
                    else return 0;
                }).collect(Collectors.toList());

        Integer totalExp = exps.stream().reduce((sum, exp) -> sum + exp).orElse(0);

        UserExp userExp = userExpRepository.findByUser(user)
                .orElseThrow(DataNotFoundException::new);

        // 검증 결과 일치하지 않으면 재저장
        if (!userExp.getExp().equals(totalExp)) {
            userExp.changeExp(totalExp);
            userExp.updateLevel(levelRepository.findByMinExpLessThanEqualAndMaxExpGreaterThanEqual(totalExp, totalExp));
        }

        return UserExpLevelResponseDto.builder()
                .exp(totalExp)
                .levelId(userExp.getLevel().getId())
                .levelName(userExp.getLevel().getName())
                .build();
    }
}
