package com.a603.youlangme.advice.exception;

public class RefreshTokenExpiredException extends RuntimeException{
    public RefreshTokenExpiredException() {
    }

    public RefreshTokenExpiredException(String message) {
        super(message);
    }

    public RefreshTokenExpiredException(String message, Throwable cause) {
        super(message, cause);
    }
}
