package com.a603.youlangme.dto.user;

import com.a603.youlangme.entity.User;
import com.a603.youlangme.enums.Gender;
import com.a603.youlangme.enums.Language;
import com.a603.youlangme.enums.Nationality;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
//@AllArgsConstructor
//@Builder
public class UserLoginUserResponseDto {

    private Long id;

    private LocalDateTime regTime;

    private String name;

//    private String email;

    private int age;

    private Nationality nationality;

    private Gender gender;

    private Long exp = 0L;

    private Language mylanguage;

    private Language yourlanguage;

    private String image;

    public UserLoginUserResponseDto(User user) {
        this.id = user.getId();
        this.regTime = user.getCreatedDate();
        this.name = user.getName();
        this.age = user.getAge();
        this.nationality=user.getNationality();
        this.gender=user.getGender();
        this.exp = user.getExp();
        this.mylanguage=user.getMylanguage();
        this.yourlanguage=user.getYourlanguage();
        this.image= user.getImage();
    }
}
