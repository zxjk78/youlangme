package com.a603.youlangme.entity;

import javax.persistence.Entity;
import javax.persistence.OneToMany;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Favorite extends BaseEntity{

    private String favorite_name;

    @OneToMany(mappedBy = "favorite")
    List<UserFavorite> userFavoriteList=new ArrayList<>();

    public static Favorite of(String favorite_name){
        Favorite favorite=new Favorite();
        favorite.favorite_name=favorite_name;
        return favorite;
    }
}
