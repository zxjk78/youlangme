package com.a603.youlangme.entity.meta;

import com.a603.youlangme.entity.BaseEntity;
import lombok.Getter;

import javax.persistence.Entity;

@Entity
@Getter
public class Level extends BaseEntity {

    private Integer level;
    private Integer minExp;
    private Integer maxExp;
}
