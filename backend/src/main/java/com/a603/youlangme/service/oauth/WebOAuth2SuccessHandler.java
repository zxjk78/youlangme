package com.a603.youlangme.service.oauth;

import com.a603.youlangme.config.security.JwtProvider;
import com.a603.youlangme.dto.token.TokenResponseDto;
import com.a603.youlangme.dto.user.UserSignupRequestDto;
import com.a603.youlangme.entity.RefreshToken;
import com.a603.youlangme.entity.User;
import com.a603.youlangme.entity.UserExp;
import com.a603.youlangme.repository.LevelRepository;
import com.a603.youlangme.repository.RefreshTokenRepository;
import com.a603.youlangme.repository.UserExpRepository;
import com.a603.youlangme.repository.UserRepository;
import com.a603.youlangme.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseCookie;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Slf4j
@RequiredArgsConstructor
@Component
public class WebOAuth2SuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtProvider jwtProvider;
    private final RefreshTokenRepository refreshTokenRepository;
    private final UserExpRepository userExpRepository;
    private final LevelRepository levelRepository;
    private final UserService userService;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication)
            throws IOException, ServletException {
        OAuth2User oAuth2User = (OAuth2User)authentication.getPrincipal();

        User user = userRepository.findByEmail(oAuth2User.getName()).orElse(null);
        if (user == null) {
            user = UserSignupRequestDto.builder().email(oAuth2User.getName()).password(oAuth2User.getName()).build().toEntity(passwordEncoder);
            User newUser = userRepository.save(user);
            userExpRepository.save(UserExp.builder()
                    .user(newUser)
                    .exp(0)
                    .level(levelRepository.getReferenceById(1L))
                    .build());
        }

        TokenResponseDto tokenDto = jwtProvider.createTokenDto(user.getId(), user.getRoles());

        RefreshToken refreshToken = RefreshToken.builder()
                .tokenKey(user.getId())
                .token(tokenDto.getRefreshToken())
                .build();
        RefreshToken savedRefreshToken = refreshTokenRepository.findByTokenKey(user.getId()).orElse(null);
        if (savedRefreshToken == null)
            refreshTokenRepository.save(refreshToken);
        else {
            savedRefreshToken.updateToken(tokenDto.getRefreshToken());
        }
        log.info("Principal에서 꺼낸 OAuth2User = {}", oAuth2User);

        Cookie cookie = new Cookie("accessToken", tokenDto.getAccessToken());
        cookie.setPath("/");
        cookie.setHttpOnly(false);
        cookie.setMaxAge(300);
        response.addCookie(cookie);

        cookie = new Cookie("refreshToken", tokenDto.getRefreshToken());
        cookie.setPath("/");
        cookie.setHttpOnly(false);
        cookie.setMaxAge(300);
        response.addCookie(cookie);

        cookie = new Cookie("accessTokenExpireDate", String.valueOf(tokenDto.getAccessTokenExpireDate()));
        cookie.setPath("/");
        cookie.setHttpOnly(false);
        cookie.setMaxAge(300);
        response.addCookie(cookie);

        cookie = new Cookie("refreshTokenCookie", tokenDto.getRefreshToken());
        cookie.setMaxAge(14 * 24 * 60 * 60);
        cookie.setPath("/");
        cookie.setSecure(true);
        cookie.setHttpOnly(true);
        response.addCookie(cookie);

        getRedirectStrategy().sendRedirect(request, response, "https://i7a603.p.ssafy.io/social");

        // 출석 로그
        userService.logAttendance(oAuth2User.getName());
    }
}
