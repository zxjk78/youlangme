package com.a603.youlangme.advice.exception;

public class ImgSaveFailException extends RuntimeException{
    public ImgSaveFailException() {
        super();
    }

    public ImgSaveFailException(String message) {
        super(message);
    }

    public ImgSaveFailException(String message, Throwable cause) {
        super(message, cause);
    }
}
