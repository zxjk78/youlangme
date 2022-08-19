package com.a603.youlangme.dto.user;

import com.a603.youlangme.enums.Gender;
import com.a603.youlangme.enums.Language;
import com.a603.youlangme.enums.Nationality;
import lombok.Getter;
import lombok.ToString;

import java.time.LocalDate;
import java.util.List;

@Getter
@ToString
public class UserSetBasicInfoRequestDto {

    private String name;

    private LocalDate birthDay;

    private Gender gender;

    private Language myLanguage;

    private Language yourLanguage;

    private Nationality nationality;

    private List<Long> favoriteList;

}
