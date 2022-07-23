package com.a603.youlangme.dto.user;

import com.a603.youlangme.dto.badge.BadgeResponseDto;
import com.a603.youlangme.entity.Favorite;
import com.a603.youlangme.enums.Gender;
import com.a603.youlangme.enums.Language;
import com.a603.youlangme.enums.Nationality;
import lombok.*;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Setter
public class UserProfileResponseDto {

    public String name;

    public Language mylanguage;

    public Language yourlanguage;

    public List<String> favorites = new ArrayList<>();

    public Gender gender;

    public Nationality nationality;

    public int age;

}
