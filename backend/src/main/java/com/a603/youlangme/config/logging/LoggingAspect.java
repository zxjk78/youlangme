package com.a603.youlangme.config.logging;


import com.a603.youlangme.entity.Log;
import com.a603.youlangme.entity.User;
import com.a603.youlangme.repository.LogRepository;
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
import java.util.Map;
import java.util.stream.Collectors;

@Slf4j
@Component
@Aspect
@RequiredArgsConstructor
public class LoggingAspect {

    private final LogRepository logRepository;

    @Around("@annotation(com.a603.youlangme.config.logging.Logging)")
    public Object logging(ProceedingJoinPoint pjp) throws Throwable {
        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest();
        ContentCachingRequestWrapper cachingRequest = (ContentCachingRequestWrapper) request;

        SecurityContext context = SecurityContextHolder.getContext();
        Authentication authentication = context.getAuthentication();
        User loginUser = ((User) authentication.getPrincipal());

        Long userId = loginUser.getId();
        String action = pjp.getSignature().getName();

        long startAt = System.currentTimeMillis();

        Object result = pjp.proceed();

        Long targetId = (Long) result;

        long endAt = System.currentTimeMillis();

        logRepository.save(new Log(userId, action, targetId));

        return result;
    }

}
