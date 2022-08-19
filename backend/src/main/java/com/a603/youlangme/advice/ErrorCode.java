package com.a603.youlangme.advice;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ErrorCode {
    DefaultException(9999, "예외 발생"),
    UserNotFound(1000, "일치하는 사용자가 존재하지 않음"),
    EmailLoginFailed(1001, "가입하지 않은 아이디 또는 잘못된 비밀번호"),
    EmailSignupFailed(1002, "이미 가입된 이메일으로 회원 가입 시도"),
    AuthenticationEntrypoint(1003, "해당 자원에 접근하기 위한 권한이 없음"),
    AccessDenied(1004, "해당 자원에 접근하기 위한 권한이 충분하지 않음"),
    RefreshTokenNotEqualException(1005, "리프레시 토큰이 일치하지 않음"),
    RefreshTokenExpiredException(1006, "리프레시 토큰이 만료됨, 재로그인 필요"),
    RefreshTokenNotFoundException(1007, "리프레시 토큰이 DB에 존재하지 않음"),
    UnAllowedAccessException(1008, "허용하지 않는 접근 방식"),
    DataNotFoundException(1009, "DB에 데이터가 존재하지 않음"),
    ImgSaveFailException(1010, "이미지 저장에 실패함"),

    EmailNotFount(1011,"가입된 이메일 없음"),
    SessionNotFoundException(1012,"현재 미팅 세션이 존재하지 않음"),

    AccessTokenExpiredException(1013, "엑세스 토큰이 만료됨, 재발급 필요")
    ;



    private int code;
    private String message;
}
