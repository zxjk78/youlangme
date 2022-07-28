package com.a603.youlangme.controller;


import com.a603.youlangme.dto.token.TokenRequestDto;
import com.a603.youlangme.dto.token.TokenResponseDto;
import com.a603.youlangme.dto.user.UserLoginRequestDto;
import com.a603.youlangme.dto.user.UserSignupRequestDto;
import com.a603.youlangme.entity.User;
import com.a603.youlangme.response.CommonResult;
import com.a603.youlangme.response.OneResult;
import com.a603.youlangme.service.ResponseService;
import com.a603.youlangme.service.SignService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@Api(tags = "1. SignUp / LogIn")
@RequiredArgsConstructor
@RestController
public class SignController {
    private final SignService signService;
    private final ResponseService responseService;

    @ApiOperation(value = "로그인", notes = "이메일로 로그인 수행")
    @PostMapping("/login")
    public OneResult<TokenResponseDto> login (
            @ApiParam(value = "로그인 DTO", required = true) @RequestBody UserLoginRequestDto userLoginRequestDto) {
        TokenResponseDto tokenDto = signService.login(userLoginRequestDto);
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
    public OneResult<TokenResponseDto> reissue(
            @ApiParam(value = "토큰 재발급 DTO", required = true)
            @RequestBody TokenRequestDto tokenRequestDto) {
            return responseService.getOneResult(signService.reissue(tokenRequestDto));
    }

    @DeleteMapping("/log-out")
    public CommonResult logout () {
        SecurityContext context = SecurityContextHolder.getContext();
        Authentication authentication = context.getAuthentication();
        User loginUser = (User) authentication.getPrincipal();
        signService.logout(loginUser.getId());
        return responseService.getSuccessResult();
    }

    @GetMapping("/findPwd/{email}")
    public CommonResult findPwd(@PathVariable(value ="email") String email){
        signService.findEmail(email);
        return responseService.getSuccessResult();
    }
}
