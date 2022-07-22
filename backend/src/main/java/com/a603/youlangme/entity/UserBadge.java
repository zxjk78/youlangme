package com.a603.youlangme.entity;

import com.a603.youlangme.enums.Achievement;
import lombok.Getter;

import javax.persistence.*;

@Entity
@Getter
public class UserBadge extends BaseEntity{

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "badge_id")
    private Badge badge;

    @Enumerated(EnumType.STRING)
    private Achievement achievement;

}
