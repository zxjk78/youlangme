package com.a603.youlangme.dto.badge;

import com.a603.youlangme.entity.Badge;
import com.a603.youlangme.enums.BadgeSelect;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
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
