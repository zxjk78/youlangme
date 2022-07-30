package com.a603.youlangme.config.logging;


import com.a603.youlangme.advice.exception.UserNotFoundException;
import com.a603.youlangme.entity.Feed;
import com.a603.youlangme.entity.Follow;
import com.a603.youlangme.entity.UserExp;
import com.a603.youlangme.entity.log.ExpAcquisitionLog;
import com.a603.youlangme.entity.log.Log;
import com.a603.youlangme.entity.User;
import com.a603.youlangme.entity.meta.ExpActivity;
import com.a603.youlangme.enums.LogType;
import com.a603.youlangme.enums.Notification;
import com.a603.youlangme.repository.*;
import com.a603.youlangme.service.UserExpService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import org.springframework.web.util.ContentCachingRequestWrapper;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Component
@Aspect
@RequiredArgsConstructor
public class LoggingAspect {

    private final LogRepository logRepository;
    private final UserRepository userRepository;
    private final FeedRepository feedRepository;
    private final BoardRepository boardRepository;

    private final ExpLogRepository expLogRepository;
    private final ExpActivityRepository expActivityRepository;
//    private final UserExpRepository userExpRepository;
    private final UserExpService userExpService;

    @Around("@annotation(com.a603.youlangme.config.logging.Logging)")
    public Object logging(ProceedingJoinPoint pjp) throws Throwable {
        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest();
        ContentCachingRequestWrapper cachingRequest = (ContentCachingRequestWrapper) request;

        SecurityContext context = SecurityContextHolder.getContext();
        Authentication authentication = context.getAuthentication();
        User loginUser = ((User) authentication.getPrincipal());

        String action = pjp.getSignature().getName();

        long startAt = System.currentTimeMillis();

        Object result = pjp.proceed();

        Long targetId = (Long) result;

        long endAt = System.currentTimeMillis();
        if (action.equalsIgnoreCase("savePost")) {
            Log log = logRepository.save(new Log(loginUser, LogType.WRITE_POST, (Long) result));
            User user = userRepository.findById(loginUser.getId()).orElse(null);
            for (Follow follow : user.getFollowers()) {
                //logRepository.save(new Log(follow.getFollower(), LogType.WRITE_POST, loginUser, Notification.ON, (Long)result));
                feedRepository.save(new Feed(follow.getFollower(), log, Notification.ON));
            }

        } else if (action.equalsIgnoreCase("saveFollow")) {
            Log log = logRepository.save(new Log(loginUser, LogType.FOLLOWED, (Long) result));
            User followee = userRepository.findById((Long)result).orElse(null);
            //logRepository.save(new Log(followee, LogType.FOLLOWED, loginUser, Notification.ON, null));
            feedRepository.save(new Feed(followee, log, Notification.ON));
        }

        return result;
    }

    @AfterReturning(value = "@annotation(com.a603.youlangme.config.logging.ExpLogging)", returning = "targetId")
    public void logExp(JoinPoint jp, Long targetId) throws Throwable {

        SecurityContext context = SecurityContextHolder.getContext();
        Authentication authentication = context.getAuthentication();
        User loginUser = ((User) authentication.getPrincipal());

        String action = jp.getSignature().getName();

        // 원하는 Activity를 어떻게 넣어줘야 하나? 꼭 조회를 해야할까?
        // getOne을 이용? -> getReferenceById로 바뀜
        // 1.글쓰기 / 2.댓글쓰기 / 3.미팅 / 4.출석

        Long activityId = null;

        if (action.equalsIgnoreCase("savePost")) {
            activityId = 1L;
        } else if (action.equalsIgnoreCase("saveReply")) {
            activityId = 2L;
        }
        // 경험치 획득 활동 지정
        ExpActivity activity = expActivityRepository.getReferenceById(activityId);

        ExpAcquisitionLog log = ExpAcquisitionLog.builder()
                .user(loginUser)
                .activity(activity)
                .targetId(targetId)
                .build();
        // 경험치 획득 로그 저장
        expLogRepository.save(log);

        // 경험치 업데이트 (레벨도 업데이트)
        userExpService.addExp(loginUser, activity);


    }

}
