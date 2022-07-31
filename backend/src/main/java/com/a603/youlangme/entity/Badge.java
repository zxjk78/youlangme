package com.a603.youlangme.entity;

import com.a603.youlangme.dto.badge.BadgeResponseDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor
public class Badge extends BaseEntity{

    @Column(nullable = true, length = 50)
    private String name;

    @Column(nullable = true, length = 50)
    private String description;

    @OneToMany(mappedBy = "badge", cascade = CascadeType.ALL)
    List<UserBadge> userBadges = new ArrayList<>();


}
