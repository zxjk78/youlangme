package com.a603.youlangme.advice.exception;

public class EmailLoginFailedException extends RuntimeException{
    public EmailLoginFailedException() {
        super();
    }

    public EmailLoginFailedException(String message) {
        super(message);
    }

    public EmailLoginFailedException(String message, Throwable cause) {
        super(message, cause);
    }
}
