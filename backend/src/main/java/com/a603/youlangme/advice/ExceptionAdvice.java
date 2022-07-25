package com.a603.youlangme.advice;


import com.a603.youlangme.advice.exception.*;
import com.a603.youlangme.advice.exception.*;
import com.a603.youlangme.response.CommonResult;
import com.a603.youlangme.service.ResponseService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import javax.servlet.http.HttpServletRequest;

@RestControllerAdvice // 모든 @Controller에서 발생하는 예외를 잡아 처리함, Json 형식으로 에러 응답
@RequiredArgsConstructor
public class ExceptionAdvice {
    private final ResponseService responseService;

    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    protected CommonResult defaultException(HttpServletRequest request, Exception e) {
        e.printStackTrace();
        return responseService.getFailResult(ErrorCode.DefaultException.getCode(), ErrorCode.DefaultException.getMessage());
    }

    @ExceptionHandler(UserNotFoundException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    protected CommonResult userNotFoundException(HttpServletRequest request, UserNotFoundException e) {
        return responseService.getFailResult(ErrorCode.UserNotFound.getCode(), ErrorCode.UserNotFound.getMessage());
    }

    @ExceptionHandler(EmailLoginFailedException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    protected CommonResult emailLoginFailedException(HttpServletRequest request, EmailLoginFailedException e) {
        return responseService.getFailResult(ErrorCode.EmailLoginFailed.getCode(), ErrorCode.EmailLoginFailed.getMessage());
    }

    @ExceptionHandler(EmailSignupFailedException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    protected CommonResult emailSignupFailedException(HttpServletRequest request, EmailSignupFailedException e) {
        return responseService.getFailResult(ErrorCode.EmailSignupFailed.getCode(), ErrorCode.EmailSignupFailed.getMessage());
    }

    @ExceptionHandler(AuthenticationEntryPointException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    protected CommonResult authenticationEntrypointException(HttpServletRequest request, AuthenticationEntryPointException e) {
        return responseService.getFailResult(ErrorCode.AuthenticationEntrypoint.getCode(), ErrorCode.AuthenticationEntrypoint.getMessage());
    }

    @ExceptionHandler(AccessDeniedException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    protected CommonResult accessDeniedException(HttpServletRequest request, AccessDeniedException e) {
        return responseService.getFailResult(ErrorCode.AccessDenied.getCode(), ErrorCode.AccessDenied.getMessage());
    }

    @ExceptionHandler(RefreshTokenNotEqualException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    protected CommonResult refreshTokenException(HttpServletRequest request, RefreshTokenNotEqualException e) {
        return responseService.getFailResult(ErrorCode.RefreshTokenNotEqualException.getCode(), ErrorCode.RefreshTokenNotEqualException.getMessage());
    }

    @ExceptionHandler(RefreshTokenExpiredException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    protected CommonResult refreshTokenException(HttpServletRequest request, RefreshTokenExpiredException e) {
        return responseService.getFailResult(ErrorCode.RefreshTokenExpiredException.getCode(), ErrorCode.RefreshTokenExpiredException.getMessage());
    }

    @ExceptionHandler(RefreshTokenNotFoundException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    protected CommonResult refreshTokenException(HttpServletRequest request, RefreshTokenNotFoundException e) {
        return responseService.getFailResult(ErrorCode.RefreshTokenNotFoundException.getCode(), ErrorCode.RefreshTokenNotFoundException.getMessage());
    }

    @ExceptionHandler(UnAllowedAccessException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    protected CommonResult unAllowedAccessException(HttpServletRequest request, UnAllowedAccessException e) {
        return responseService.getFailResult(ErrorCode.UnAllowedAccessException.getCode(), ErrorCode.UnAllowedAccessException.getMessage());
    }

    @ExceptionHandler(DataNotFoundException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    protected CommonResult dataNotFoundException(HttpServletRequest request, DataNotFoundException e) {
        return responseService.getFailResult(ErrorCode.DataNotFoundException.getCode(), ErrorCode.DataNotFoundException.getMessage());
    }

    @ExceptionHandler(ImgSaveFailException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    protected CommonResult imgSaveFailException(HttpServletRequest request, ImgSaveFailException e) {
        return responseService.getFailResult(ErrorCode.ImgSaveFailException.getCode(), ErrorCode.ImgSaveFailException.getMessage());
    }
}
