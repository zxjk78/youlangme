package com.a603.youlangme.config.security;


import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import java.util.Arrays;
import java.util.Collections;

@RequiredArgsConstructor
@Configuration
@EnableWebSecurity(debug = true)
//@EnableGlobalMethodSecurity(prePostEnabled = true, securedEnabled = true)
public class SecurityConfiguration {
    private final JwtProvider jwtProvider;

    // Security Filter 중, UsernamePasswordAuthentication과 같은 인증 필터들은 AuthenticationManager를 통해 인증을 수행함
    // 인증이 성공하면 인증 필터는 SecuritycontextHolder의 SecurityContext에 인증된 Authentication 객체를 저장함

    @Bean
    public AuthenticationManager authenticationManagerBean(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http    .cors().and()
                .httpBasic().disable() // 초기 설정은 비 인증시 로그인 폼으로 리다이렉트 되는데 REST API 이므로 disable
                .csrf().disable() // REST API 이므로 상태를 저장하지 않기 때문에 CSRF 보안을 설정할 필요가 없으므로 disable
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS) // Jwt로 인증하므로 세션이 필요하지 않음
                .and()
                    .authorizeRequests() // exception Handling을 위해 permit
                    .antMatchers("/login", "/signup", "/reissue", "/exception/**", "/favorite/list").permitAll() // 로그인, 회원가입은 누구나 허용
                    // exception Handling을 위해 permit
                .anyRequest().hasRole("USER")

                .and()
                    .exceptionHandling()

                    // jwt 토큰이 없거나 토큰이 틀린 경우 exceptionHandling
                    .authenticationEntryPoint(new WebAuthenticationEntryPoint())

                    // 해당 자원에 접근하기 위한 권한이 부족한 경우 exceptionHandling
                    .accessDeniedHandler(new WebAccessDeniedHandler())

                .and()
                    // jwt 인증 필터를 UsernamePasswordAuthenticationFilter 전에 추가
                    // 이렇게 했을때 JwtAuthenticationFilter(커스텀필터)에서 인증이 완료되었기 때문에 UsernamePasswordAuthenticationFilter를 거치지 않고 넘어감
                    .addFilterBefore(new JwtAuthenticationFilter(jwtProvider), UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }



    @Bean
    public WebSecurityCustomizer webSecurityCustomizer() {
        // Swagger 관련 Url 예외처리
        return (web) -> web.ignoring().antMatchers("/v2/api-docs", "/swagger-resources/**",
                "/swagger-ui/index.html", "/webjars/**", "/swagger/**", "/swagger-ui/**");
    }
}
