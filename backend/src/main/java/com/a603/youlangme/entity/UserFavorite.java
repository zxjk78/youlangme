package com.a603.youlangme.entity;

import javax.persistence.*;

@Entity
public class UserFavorite extends BaseEntity{

    @ManyToOne(fetch = FetchType.LAZY,cascade = CascadeType.ALL)
    @JoinColumn(name="user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY,cascade = CascadeType.ALL)
    @JoinColumn(name="favorite_id")
    private Favorite favorite;
}
