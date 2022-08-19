package com.a603.youlangme.advice.exception;

public class BoardNotFoundException extends RuntimeException{
    public BoardNotFoundException() {
        super();
    }

    public BoardNotFoundException(String message) {
        super(message);
    }

    public BoardNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }
}
