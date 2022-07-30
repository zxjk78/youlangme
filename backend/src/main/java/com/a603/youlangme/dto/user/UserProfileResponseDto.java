package com.a603.youlangme.dto.user;

import com.a603.youlangme.enums.Gender;
import com.a603.youlangme.enums.Language;
import com.a603.youlangme.enums.Nationality;
import lombok.*;

import java.time.LocalDate;
import java.util.ArrayList;
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

    public List<Long> favorites = new ArrayList<>();

    public Gender gender;

    public LocalDate birthDay;

    public Nationality nationality;


}
