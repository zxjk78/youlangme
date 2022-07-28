package com.a603.youlangme.advice.exception;

public class EmailNotFoundException extends  RuntimeException{
    public EmailNotFoundException() {
        super();
    }

    public EmailNotFoundException(String message) {
        super(message);
    }

    public EmailNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }
}
