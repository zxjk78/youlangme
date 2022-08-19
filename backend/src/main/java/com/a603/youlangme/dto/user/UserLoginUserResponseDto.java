package com.a603.youlangme.dto.user;

import com.a603.youlangme.entity.User;
import com.a603.youlangme.enums.Gender;
import com.a603.youlangme.enums.Language;
import com.a603.youlangme.enums.Nationality;
import lombok.Getter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
public class UserLoginUserResponseDto {

    private Long id;

    private LocalDateTime regTime;

    private String name;


    private Nationality nationality;

    private Gender gender;

    private LocalDate birthDay;

    private Language mylanguage;

    private Language yourlanguage;

    private String image;

    public UserLoginUserResponseDto(User user) {
        this.id = user.getId();
        this.regTime = user.getCreatedTime();
        this.name = user.getName();
        this.nationality=user.getNationality();
        this.gender=user.getGender();
        this.mylanguage=user.getMylanguage();
        this.yourlanguage=user.getYourlanguage();
        this.image = user.getImage();
        this.birthDay = user.getBirthDay();
    }
}
