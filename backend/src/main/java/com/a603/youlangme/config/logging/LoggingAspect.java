package com.a603.youlangme.config.logging;


import com.a603.youlangme.entity.Feed;
import com.a603.youlangme.entity.Follow;
import com.a603.youlangme.entity.Log;
import com.a603.youlangme.entity.User;
import com.a603.youlangme.enums.LogType;
import com.a603.youlangme.enums.Notification;
import com.a603.youlangme.repository.BoardRepository;
import com.a603.youlangme.repository.FeedRepository;
import com.a603.youlangme.repository.LogRepository;
import com.a603.youlangme.repository.UserRepository;
import com.google.common.base.Joiner;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.io.IOUtils;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestAttributes;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import org.springframework.web.util.ContentCachingRequestWrapper;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Map;
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

}
