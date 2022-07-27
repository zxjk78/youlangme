package com.a603.youlangme.config.logging;


import com.a603.youlangme.entity.Follow;
import com.a603.youlangme.entity.Log;
import com.a603.youlangme.entity.User;
import com.a603.youlangme.enums.LogType;
import com.a603.youlangme.enums.Notification;
import com.a603.youlangme.repository.BoardRepository;
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
            User user = userRepository.findById(loginUser.getId()).orElse(null);
            for (Follow follow : user.getFollowers()) {
                logRepository.save(new Log(follow.getFollower(), LogType.WRITE_POST, loginUser, Notification.ON, (Long)result));
            }

        } else if (action.equalsIgnoreCase("saveFollow")) {
            User followee = userRepository.findById((Long)result).orElse(null);
            logRepository.save(new Log(followee, LogType.FOLLOWED, loginUser, Notification.ON, null));
        }

//        logs = logRepository.findAllByUser(loginUser);
//        for (log : logs) {
//            log.update(Notification.OFF);
//        }

        //logRepository.save(new Log(userId, action, targetId));

        return result;
    }

}
