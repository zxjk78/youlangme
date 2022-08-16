package com.a603.youlangme.service;


import com.a603.youlangme.advice.exception.*;
import com.a603.youlangme.config.security.JwtProvider;
import com.a603.youlangme.dto.token.TokenRequestDto;
import com.a603.youlangme.dto.token.TokenResponseDto;
import com.a603.youlangme.dto.user.UserLoginRequestDto;
import com.a603.youlangme.dto.user.UserSignupRequestDto;
import com.a603.youlangme.entity.RefreshToken;
import com.a603.youlangme.entity.User;
import com.a603.youlangme.entity.UserExp;
import com.a603.youlangme.repository.LevelRepository;
import com.a603.youlangme.repository.RefreshTokenRepository;
import com.a603.youlangme.repository.UserExpRepository;
import com.a603.youlangme.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMailMessage;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import javax.transaction.Transactional;
import java.time.Instant;
import java.util.Date;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class SignService {
    private final UserRepository userRepository;
    private final UserExpRepository userExpRepository;
    private final LevelRepository levelRepository;

    private final PasswordEncoder passwordEncoder;
    private final JwtProvider jwtProvider;
    private final RefreshTokenRepository refreshTokenRepository;


    private final JavaMailSender javaMailSender;


    @Transactional
    public TokenResponseDto login(UserLoginRequestDto userLoginRequestDto) {
        User user = userRepository.findByEmail(userLoginRequestDto.getEmail()).orElseThrow(EmailLoginFailedException::new);

        if(!passwordEncoder.matches(userLoginRequestDto.getPassword(), user.getPassword()))
            throw new EmailLoginFailedException();

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

        return tokenDto;
    }

    @Transactional
    public void signup(UserSignupRequestDto userSignupRequestDto) {
        if (userRepository.findByEmail(userSignupRequestDto.getEmail()).isPresent())
            throw new EmailSignupFailedException();
        User newUser = userRepository.save(userSignupRequestDto.toEntity(passwordEncoder));
        userExpRepository.save(UserExp.builder()
                .user(newUser)
                .exp(0)
                .level(levelRepository.getReferenceById(1L))
                .build());
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

        RefreshToken refreshToken = refreshTokenRepository.findByTokenKey(user.getId())
                .orElseThrow(RefreshTokenNotFoundException::new);

        if (!refreshToken.getToken().equals(tokenRequestDto.getRefreshToken()))
            throw new RefreshTokenNotEqualException();

        // AccessToken, RefreshToken 재발급, 저장
        TokenResponseDto newCreatedToken = jwtProvider.createTokenDto(user.getId(), user.getRoles());
        RefreshToken updateRefreshToken = refreshToken.updateToken(newCreatedToken.getRefreshToken());
        refreshTokenRepository.save(updateRefreshToken);

        return newCreatedToken;
    }

    @Transactional
    public void logout(Long userId) {
        User user = userRepository.findById(userId).orElse(null);
        refreshTokenRepository.deleteByTokenKey(user.getId());
    }

    @Transactional
    public void findEmail(String email) throws MessagingException {
        User user=userRepository.findByEmail(email).orElseThrow(UserNotFoundException::new);

        Random random=new Random();
        int num=random.nextInt();

        String newpwd="ssafy!"+String.valueOf(num);

        SimpleMailMessage simpleMailMessage =new SimpleMailMessage();
        simpleMailMessage.setSubject("YouLangMe 임시 비밀번호 발급입니다");
        simpleMailMessage.setFrom("ssafyskj@gmail.com");
        simpleMailMessage.setTo(email);
        simpleMailMessage.setText(newpwd);

        user.updatePwd(passwordEncoder.encode(newpwd));
        javaMailSender.send(simpleMailMessage);
    }
}

//{bcrypt}$2a$10$zIa6hXkFFTpW9Q1pUhFyC.bjN4jOZvg9GxDFeOvXXEYb6KBF3DiE6