package com.a603.youlangme.config.security;

import com.a603.youlangme.advice.ErrorCode;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class WebAuthenticationEntryPoint implements AuthenticationEntryPoint {
    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException, ServletException {
        Integer exception = (Integer)request.getAttribute("exception");
        if (exception == ErrorCode.AccessTokenExpiredException.getCode())
            response.sendRedirect("/exception/accessTokenExpired");
        else
            response.sendRedirect("/exception/entryPoint");
    }
}
