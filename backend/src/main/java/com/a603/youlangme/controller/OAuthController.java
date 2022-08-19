package com.a603.youlangme.controller;

import com.a603.youlangme.dto.token.TokenResponseDto;
import com.a603.youlangme.dto.user.UserLoginRequestDto;
import com.a603.youlangme.response.OneResult;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Api(tags = "4. OAuth Login")
@RequiredArgsConstructor
@RestController
@RequestMapping("/oauth")
public class OAuthController {

    @ApiOperation(value = "구글 로그인 후 리다이렉션", notes = "구글 로그인 후 리다이렉션")
    @PostMapping("/redirect/google")
    public void login () {

    }

}
