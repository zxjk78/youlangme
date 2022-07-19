package com.a603.youlangme.config.security;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.GenericFilterBean;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

@RequiredArgsConstructor
public class JwtAuthenticationFilter extends GenericFilterBean {
    // Jwt가 유효한 토큰인지 인증하는 Filter
    // UsernamePasswordAuthentication 앞에 세팅되어 로그인폼으로 반환하기 전에 인증 여부를 반환

    private final JwtProvider jwtProvider;

    // request로 들어오는 Jwt의 유효성을 검증, JwtProvider의 validationToken()을 사용해서 검사
    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        String token = jwtProvider.resolveToken((HttpServletRequest) request); // HTTP 메세지의 헤더에서 JWT 토큰 가져옴
        if (token != null && jwtProvider.validationToken(token)) { // 토큰이 있는지와 토큰의 유효성 검사
            Authentication authentication = jwtProvider.getAuthentication(token); // Authentication 객체 생성
            SecurityContextHolder.getContext().setAuthentication(authentication); // Authentication 객체를 SecurityContextHolder에 저장, 인증 객체를 전역적으로 사용 가능
            //Authentication은 SecurityContext에 저장되고 SecurityContext는 결과적으로 ThreadLocal에 저장됨 (SecurityContextHolder가 ThreadLocal에 저장되게 함)
            //ThreadLocal은 한 Thread 범위 내에서 정보를 저장하므로 이곳에 저장된 SecurityContext 정보를 꺼내서 사용할 수 있게됨
        }
        chain.doFilter(request, response);
    }
}
