package com.a603.youlangme.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

import javax.persistence.*;

@Entity
@Getter
@ToString
public class UserFavorite extends BaseEntity{

    // cascade 설정 시 UserFavorite 삭제하면 유저와 관심사도 사라져버림
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="favorite_id")
    private Favorite favorite;

    protected UserFavorite() {}

    @Builder
    public UserFavorite(User user, Favorite favorite){
        this.user=user;
        this.favorite=favorite;
    }

}
