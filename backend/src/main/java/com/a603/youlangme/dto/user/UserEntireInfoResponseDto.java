package com.a603.youlangme.dto.user;

import com.a603.youlangme.entity.User;
import com.a603.youlangme.enums.Gender;
import com.a603.youlangme.enums.Language;
import com.a603.youlangme.enums.Nationality;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import javax.persistence.Column;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
//@AllArgsConstructor
//@Builder
public class UserEntireInfoResponseDto {

    private Long id;

    private LocalDateTime regTime;

    private String name;

    private Nationality nationality;

    private Gender gender;

    private LocalDate birthDay;


    private Language mylanguage;

    private Language yourlanguage;

    private String image;

    public UserEntireInfoResponseDto(User user) {
        this.id = user.getId();
        this.regTime = user.getCreatedDate();
        this.name = user.getName();
        this.nationality=user.getNationality();
        this.gender=user.getGender();
        this.mylanguage=user.getMylanguage();
        this.yourlanguage=user.getYourlanguage();
        this.image= user.getImage();
        this.birthDay = user.getBirthDay();
    }
}
