package com.a603.youlangme.entity.meta;

import com.a603.youlangme.entity.BaseEntity;
import lombok.Getter;

import javax.persistence.Entity;

@Entity
@Getter
public class Level extends BaseEntity {

    private String name;
    private Integer minExp;
    private Integer maxExp;
}
