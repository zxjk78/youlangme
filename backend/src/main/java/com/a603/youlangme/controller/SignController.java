package com.a603.youlangme.controller;


import com.a603.youlangme.advice.exception.UserNotFoundException;
import com.a603.youlangme.dto.token.TokenRequestDto;
import com.a603.youlangme.dto.token.TokenResponseDto;
import com.a603.youlangme.dto.user.UserLoginRequestDto;
import com.a603.youlangme.dto.user.UserSignupRequestDto;
import com.a603.youlangme.entity.User;
import com.a603.youlangme.entity.log.AttendanceLog;
import com.a603.youlangme.repository.UserRepository;
import com.a603.youlangme.repository.log.AttendanceLogRepository;
import com.a603.youlangme.response.CommonResult;
import com.a603.youlangme.response.OneResult;
import com.a603.youlangme.service.ResponseService;
import com.a603.youlangme.service.SignService;
import com.a603.youlangme.service.UserService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseCookie;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.mail.MessagingException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Api(tags = "1. SignUp / LogIn")
@RequiredArgsConstructor
@RestController
public class SignController {
    private final SignService signService;
    private final ResponseService responseService;
    private final UserService userService;

    @ApiOperation(value = "로그인", notes = "이메일로 로그인 수행")
    @PostMapping("/login")
    public OneResult<TokenResponseDto> login (HttpServletResponse response,
            @ApiParam(value = "로그인 DTO", required = true) @RequestBody UserLoginRequestDto userLoginRequestDto) {
        TokenResponseDto tokenDto = signService.login(userLoginRequestDto);
        // 출석 로그
        userService.logAttendance(userLoginRequestDto.getEmail());

        Cookie cookie = new Cookie("refreshTokenCookie", tokenDto.getRefreshToken());
        cookie.setMaxAge(14 * 24 * 60 * 60);
        cookie.setPath("/");
        cookie.setSecure(true);
        cookie.setHttpOnly(true);
        response.addCookie(cookie);

        return responseService.getOneResult(tokenDto);
    }

    @ApiOperation(value = "회원가입", notes = "회원가입 수행")
    @PostMapping("/signup")
    public CommonResult signup (
            @ApiParam(value = "회원가입 DTO", required = true) @RequestBody UserSignupRequestDto userSignupRequestDto) {
        signService.signup(userSignupRequestDto);
        return responseService.getSuccessResult();
    }

    @ApiOperation(value = "Access Token, Refresh Token 재발급",
            notes = "Access Token 만료시 회원 검증 후 Refresh Token을 검증해서 두 Token을 재발급")
    @PostMapping("/reissue")
    public OneResult<TokenResponseDto> reissue(@CookieValue(value = "refreshTokenCookie", required = false) Cookie refresh, HttpServletResponse response, @ApiParam(value = "토큰 재발급 DTO", required = true) @RequestBody TokenRequestDto tokenRequestDto) {
            return responseService.getOneResult(signService.reissue(tokenRequestDto));
    }

    @DeleteMapping("/log-out")
    public CommonResult logout (@CookieValue(value = "refreshTokenCookie", required = false) Cookie refresh, HttpServletResponse response) {
        System.out.println(refresh.getValue());
        Cookie cookie = new Cookie("refreshTokenCookie", null);
        cookie.setMaxAge(0);
        cookie.setPath("/");
        cookie.setSecure(true);
        cookie.setHttpOnly(true);
        response.addCookie(cookie);

        SecurityContext context = SecurityContextHolder.getContext();
        Authentication authentication = context.getAuthentication();
        User loginUser = (User) authentication.getPrincipal();
        signService.logout(loginUser.getId());
        return responseService.getSuccessResult();
    }

    @PostMapping("/findPwd/{email}")
    public CommonResult findPwd(@PathVariable(value ="email") String email) throws MessagingException {
        SecurityContext context = SecurityContextHolder.getContext();
        Authentication authentication = context.getAuthentication();
        User loginUser = (User) authentication.getPrincipal();
        signService.findEmail(email);
        return responseService.getSuccessResult();
    }
}
