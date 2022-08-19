package com.a603.youlangme.advice.exception;

public class AccessTokenExpiredException extends RuntimeException{
    public AccessTokenExpiredException() {
    }

    public AccessTokenExpiredException(String message) {
        super(message);
    }

    public AccessTokenExpiredException(String message, Throwable cause) {
        super(message, cause);
    }
}
