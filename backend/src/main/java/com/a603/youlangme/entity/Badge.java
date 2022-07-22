package com.a603.youlangme.entity;

import com.a603.youlangme.dto.badge.BadgeResponseDto;
import lombok.Getter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
public class Badge extends BaseEntity{

    @Column(nullable = true, length = 50)
    private String name;

    @Column(nullable = true, length = 50)
    private String image;

    @Column(nullable = true, length = 50)
    private String description;

    @OneToMany(mappedBy = "badge", cascade = CascadeType.ALL)
    List<UserBadge> userBadges = new ArrayList<>();

    public BadgeResponseDto getBadgeDto() {
        return new BadgeResponseDto(id, name, description, image);
    }
}
