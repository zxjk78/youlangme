package com.a603.youlangme.config.logging;



import com.a603.youlangme.advice.exception.DataNotFoundException;
import com.a603.youlangme.entity.Feed;
import com.a603.youlangme.entity.Follow;
import com.a603.youlangme.entity.log.ChatRoomLog;
import com.a603.youlangme.entity.log.ExpAcquisitionLog;
import com.a603.youlangme.entity.log.FeedLog;
import com.a603.youlangme.entity.User;
import com.a603.youlangme.entity.log.MeetingLog;
import com.a603.youlangme.entity.meta.ExpActivity;
import com.a603.youlangme.enums.ExpUpdateType;
import com.a603.youlangme.enums.LogType;
import com.a603.youlangme.enums.Notification;
import com.a603.youlangme.repository.*;
import com.a603.youlangme.repository.log.ChatRoomLogRepository;
import com.a603.youlangme.repository.log.ExpLogRepository;
import com.a603.youlangme.repository.log.LogRepository;
import com.a603.youlangme.repository.log.MeetingLogRepository;
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
import java.time.ZoneId;
import java.util.ArrayList;
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
    private final UserExpService userExpService;
    private final ChatRoomLogRepository chatRoomLogRepository;
    private final MeetingLogRepository meetingLogRepository;

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
            FeedLog feedLog = logRepository.save(new FeedLog(loginUser, LogType.WRITE_POST, (Long) result));
            User user = userRepository.findById(loginUser.getId()).orElse(null);
            for (Follow follow : user.getFollowers()) {
                //logRepository.save(new Log(follow.getFollower(), LogType.WRITE_POST, loginUser, Notification.ON, (Long)result));
                feedRepository.save(new Feed(follow.getFollower(), feedLog, Notification.ON));
            }

        } else if (action.equalsIgnoreCase("saveFollow")) {
            FeedLog feedLog = logRepository.save(new FeedLog(loginUser, LogType.FOLLOWED, (Long) result));
            User followee = userRepository.findById((Long)result).orElse(null);
            //logRepository.save(new Log(followee, LogType.FOLLOWED, loginUser, Notification.ON, null));
            feedRepository.save(new Feed(followee, feedLog, Notification.ON));
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

        // 경험치 획득 유저 리스트
        List<User> updateUserList = new ArrayList<>();
        updateUserList.add(loginUser);

        ExpUpdateType expUpdateType = null; // 획득 경험치 계산 방식
        Long activityId = null; // 획득 활동
        Integer multiBase = 0; // 경험치 multi 방식용 곱할 값

        if (action.equalsIgnoreCase("savePost")) {
            activityId = 1L;
            expUpdateType = ExpUpdateType.ADD;
        } else if (action.equalsIgnoreCase("saveReply")) {
            activityId = 2L;
            expUpdateType = ExpUpdateType.ADD;
        } else if (action.equalsIgnoreCase("endMeeting")) {
            activityId = 3L;
            expUpdateType = ExpUpdateType.MULTI;
            ChatRoomLog closeLog = chatRoomLogRepository.findById(targetId).orElseThrow(DataNotFoundException::new);
            ChatRoomLog openLog = chatRoomLogRepository.findById(closeLog.getOpenLogId()).orElseThrow(DataNotFoundException::new);
            // 종료 신호 보낸 사람이 아닌 사람의 경험치 획득도 함께 처리
            MeetingLog opponentLog = meetingLogRepository.findOpponentMeetingLog(openLog.getId(),loginUser);
            updateUserList.add(opponentLog.getUser());
            // 미팅 시간 (분)
            int closeTime = (int)(closeLog.getCreatedTime().atZone(ZoneId.systemDefault()).toInstant().toEpochMilli()/1000);
            int openTime = (int)(openLog.getCreatedTime().atZone(ZoneId.systemDefault()).toInstant().toEpochMilli()/1000);
            multiBase = (closeTime-openTime)/60;
            // 대화 시간 n분 미만이면 경험치 획득 불가
            if(multiBase < 1) return;
        }

        for(User userToUpdate : updateUserList) {
            // 경험치 획득 활동 지정
            ExpActivity activity = expActivityRepository.getReferenceById(activityId);
            ExpAcquisitionLog log = ExpAcquisitionLog.builder()
                    .user(userToUpdate)
                    .activity(activity)
                    .targetId(targetId)
                    .multiBase(multiBase)
                    .build();
            // 경험치 획득 로그 저장
            expLogRepository.save(log);
            // 경험치 업데이트 (레벨도 업데이트)
            userExpService.addExp(expUpdateType, userToUpdate, activity, multiBase);
        }
    }

}
