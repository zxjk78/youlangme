package com.a603.youlangme.advice.exception;

public class ReplyNotFoundException extends RuntimeException{
    public ReplyNotFoundException() {
        super();
    }

    public ReplyNotFoundException(String message) {
        super(message);
    }

    public ReplyNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }
}
