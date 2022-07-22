package com.a603.youlangme.dto.badge;

import com.a603.youlangme.enums.Achievement;
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

    String image;

    Achievement achievement;

    public BadgeResponseDto(Long id, String name, String description, String image) {
        this.id = id;
        this.name = name;
        this.image = image;
        this.description = description;
    }
}
