package com.a603.youlangme.config.logging;


import com.google.common.base.Joiner;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.io.IOUtils;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
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
public class LoggingAspect {

    @Around("within(com.a603.youlangme.controller..*))")
    public Object logging(ProceedingJoinPoint pjp) throws Throwable {
        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest();

        ContentCachingRequestWrapper cachingRequest = (ContentCachingRequestWrapper) request;

        System.out.println(request.getMethod());
        System.out.println(request.getRequestURL());
        if ("POST".equalsIgnoreCase(request.getMethod()) || "PUT".equalsIgnoreCase(request.getMethod())){
            byte[] buf = cachingRequest.getContentAsByteArray();
            System.out.println(new String(buf, 0, buf.length, cachingRequest.getCharacterEncoding()));
        }

        long startAt = System.currentTimeMillis();

        Object result = pjp.proceed();

        long endAt = System.currentTimeMillis();

        System.out.println(endAt - startAt);
        return result;
    }

}
