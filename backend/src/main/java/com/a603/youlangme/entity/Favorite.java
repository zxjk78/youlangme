package com.a603.youlangme.entity;

import com.a603.youlangme.entity.BaseEntity;
import com.a603.youlangme.entity.UserFavorite;
import lombok.Getter;

import javax.persistence.Entity;
import javax.persistence.OneToMany;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
public class Favorite extends BaseEntity {

    private String name;

    @OneToMany(mappedBy = "favorite")
    List<UserFavorite> userFavoriteList=new ArrayList<>();

}
