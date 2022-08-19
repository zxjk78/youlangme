package com.a603.youlangme.entity.meta;

import com.a603.youlangme.entity.BaseEntity;
import com.a603.youlangme.entity.UserFavorite;
import lombok.Getter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.OneToMany;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
public class Favorite extends BaseEntity {

    @Column(length = 20)
    private String name;

    @OneToMany(mappedBy = "favorite")
    List<UserFavorite> userFavoriteList=new ArrayList<>();

}
