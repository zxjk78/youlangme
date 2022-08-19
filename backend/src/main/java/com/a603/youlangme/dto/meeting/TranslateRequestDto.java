package com.a603.youlangme.dto.meeting;

import lombok.Getter;

@Getter
public class TranslateRequestDto {
    private String myLanguage;

    private String yourLanguage;

    private String content;
}
