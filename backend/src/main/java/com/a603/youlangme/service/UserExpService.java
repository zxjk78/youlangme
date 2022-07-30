package com.a603.youlangme.service;

import com.a603.youlangme.advice.exception.DataNotFoundException;
import com.a603.youlangme.advice.exception.UserNotFoundException;
import com.a603.youlangme.dto.user.UserExpLevelResponseDto;
import com.a603.youlangme.entity.User;
import com.a603.youlangme.entity.UserExp;
import com.a603.youlangme.entity.log.ExpAcquisitionLog;
import com.a603.youlangme.entity.meta.ExpActivity;
import com.a603.youlangme.entity.meta.Level;
import com.a603.youlangme.repository.*;
import lombok.RequiredArgsConstructor;
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

    @Transactional
    public void addExp(User loginUser, ExpActivity activity) {

        // 경험치 업데이트 (레벨도 같이 업데이트)
        UserExp userExpToUpdate = userExpRepository.findByUser(loginUser).orElseThrow(UserNotFoundException::new);
        // 경험치 업데이트 (기존 경험치에 더해준다.)
        Integer newExp = userExpToUpdate.addExp(activity.getExp());
        // 레벨 계산
        Level levelResult = levelRepository.findByMinExpLessThanEqualAndMaxExpGreaterThanEqual(newExp, newExp);
        // 레벨 업데이트
        if(!userExpToUpdate.getLevel().equals(levelResult)) {
            userExpToUpdate.updateLevel(levelResult);
        }

    }

    @Transactional
    public UserExpLevelResponseDto getExpAndLevel(Long userId) {

        // User를 JOIN 하지 않고 로직 수행하기

        //User user = userRepository.findById(userId).orElseThrow(UserNotFoundException::new);
        User user = userRepository.getReferenceById(userId);

        // 경험치 검증(재계산)
        List<ExpAcquisitionLog> expLogs = expLogRepository.findAllByUser(user);

        List<Integer> exps = expLogs.stream()
                .map(expLog->expLog.getActivity().getExp())
                .collect(Collectors.toList());

        Integer totalExp = exps.stream().reduce((sum,exp) -> sum+exp).orElse(0);

        UserExp userExp = userExpRepository.findByUser(user)
                .orElseThrow(DataNotFoundException::new);

        // 검증 결과 일치하지 않으면 재저장
        if(!userExp.getExp().equals(totalExp)) {
            userExp.changeExp(totalExp);
            userExp.updateLevel(levelRepository.findByMinExpLessThanEqualAndMaxExpGreaterThanEqual(totalExp, totalExp));
        }

        return UserExpLevelResponseDto.builder()
                .exp(userExp.getExp())
                .level(userExp.getLevel().getLevel())
                .build();
    }
}
