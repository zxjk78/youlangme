package com.a603.youlangme.service;


import com.a603.youlangme.advice.exception.*;
import com.a603.youlangme.config.security.JwtProvider;
import com.a603.youlangme.dto.token.TokenRequestDto;
import com.a603.youlangme.dto.token.TokenResponseDto;
import com.a603.youlangme.dto.user.UserLoginRequestDto;
import com.a603.youlangme.dto.user.UserSignupRequestDto;
import com.a603.youlangme.entity.RefreshToken;
import com.a603.youlangme.entity.User;
import com.a603.youlangme.repository.RefreshTokenRepository;
import com.a603.youlangme.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@RequiredArgsConstructor
public class SignService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtProvider jwtProvider;
    private final RefreshTokenRepository refreshTokenRepository;

    @Transactional
    public TokenResponseDto login(UserLoginRequestDto userLoginRequestDto) {
        User user = userRepository.findByEmail(userLoginRequestDto.getEmail()).orElseThrow(EmailLoginFailedException::new);

        if(!passwordEncoder.matches(userLoginRequestDto.getPassword(), user.getPassword()))
            throw new EmailLoginFailedException();

        TokenResponseDto tokenDto = jwtProvider.createTokenDto(user.getUserId(), user.getRoles());

        RefreshToken refreshToken = RefreshToken.builder()
                .tokenKey(user.getUserId())
                .token(tokenDto.getRefreshToken())
                .build();
        RefreshToken savedRefreshToken = refreshTokenRepository.findByTokenKey(user.getUserId()).orElse(null);
        if (savedRefreshToken == null)
            refreshTokenRepository.save(refreshToken);
        else {
            savedRefreshToken.updateToken(tokenDto.getRefreshToken());
        }

        return tokenDto;
    }

    @Transactional
    public void signup(UserSignupRequestDto userSignupRequestDto) {
        if (userRepository.findByEmail(userSignupRequestDto.getEmail()).isPresent())
            throw new EmailSignupFailedException();
        userRepository.save(userSignupRequestDto.toEntity(passwordEncoder));
    }

    @Transactional
    public TokenResponseDto reissue(TokenRequestDto tokenRequestDto) {
        if (!jwtProvider.validationToken(tokenRequestDto.getRefreshToken())) {
            throw new RefreshTokenExpiredException();
        }

        String accessToken = tokenRequestDto.getAccessToken();
        Authentication authentication = jwtProvider.getAuthentication(accessToken);

        User user = userRepository.findByEmail(authentication.getName())
                .orElseThrow(UserNotFoundException::new);

        RefreshToken refreshToken = refreshTokenRepository.findByTokenKey(user.getUserId())
                .orElseThrow(RefreshTokenNotFoundException::new);

        if (!refreshToken.getToken().equals(tokenRequestDto.getRefreshToken()))
            throw new RefreshTokenNotEqualException();

        // AccessToken, RefreshToken 재발급, 저장
        TokenResponseDto newCreatedToken = jwtProvider.createTokenDto(user.getUserId(), user.getRoles());
        RefreshToken updateRefreshToken = refreshToken.updateToken(newCreatedToken.getRefreshToken());
        refreshTokenRepository.save(updateRefreshToken);

        return newCreatedToken;
    }
}
