package com.a603.youlangme.controller;

import com.a603.youlangme.advice.exception.AccessDeniedException;
import com.a603.youlangme.advice.exception.AccessTokenExpiredException;
import com.a603.youlangme.advice.exception.AuthenticationEntryPointException;
import com.a603.youlangme.response.CommonResult;
import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@Api(tags = {"2. Exception"})
@RequiredArgsConstructor
@RestController
@RequestMapping("/exception")
public class ExceptionController {

    @GetMapping("/entryPoint")
    public CommonResult entrypointException() {
        throw new AuthenticationEntryPointException();
    }

    @GetMapping("/accessTokenExpired")
    public CommonResult accessTokenExpiredException() {
        throw new AccessTokenExpiredException();
    }

    @PostMapping("/accessTokenExpired")
    public CommonResult accessTokenExpiredPostException() {
        throw new AccessTokenExpiredException();
    }

    @PutMapping("/accessTokenExpired")
    public CommonResult accessTokenExpiredPutException() {
        throw new AccessTokenExpiredException();
    }


    @DeleteMapping("/accessTokenExpired")
    public CommonResult accessTokenExpiredDeleteException() {
        throw new AccessTokenExpiredException();
    }

    @GetMapping("/accessDenied")
    public CommonResult accessDeniedException() {
        throw new AccessDeniedException();
    }

}
