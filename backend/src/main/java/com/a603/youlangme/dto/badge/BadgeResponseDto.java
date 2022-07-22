package com.a603.youlangme.dto.badge;

import com.a603.youlangme.enums.BadgeSelect;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
public class BadgeResponseDto {
    Long id;

    String name;

    String description;

    BadgeSelect badgeSelect;

    public BadgeResponseDto(Long id, String name, String description) {
        this.id = id;
        this.name = name;
        this.description = description;
    }
}
