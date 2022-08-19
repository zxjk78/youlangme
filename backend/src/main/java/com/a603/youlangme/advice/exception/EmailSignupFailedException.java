package com.a603.youlangme.advice.exception;

public class EmailSignupFailedException extends RuntimeException {
    public EmailSignupFailedException() {
        super();
    }

    public EmailSignupFailedException(String message) {
        super(message);
    }

    public EmailSignupFailedException(String message, Throwable cause) {
        super(message, cause);
    }
}
