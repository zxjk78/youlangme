package com.a603.youlangme.dto.badge;

import com.a603.youlangme.enums.BadgeSelect;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@AllArgsConstructor
@Getter
@Setter
@ToString
public class BadgeRequestDto {

    Long id;

    BadgeSelect badgeSelect;


}
