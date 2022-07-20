package com.a603.youlangme.dto.user;

import com.a603.youlangme.entity.Favorite;
import com.a603.youlangme.enums.Language;
import com.a603.youlangme.enums.Nationality;
import lombok.Getter;
import lombok.ToString;

import java.util.List;

@Getter
@ToString
public class UserSetBasicInfoRequestDto {

    private String name;

    private Language myLanguage;
    private Language yourLanguage;

    private Nationality nationality;

    private List<Long> favoriteList;

}
