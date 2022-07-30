package com.a603.youlangme.entity.meta;

import com.a603.youlangme.entity.BaseEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;

@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
public class ExpActivity extends BaseEntity {

    @Column(unique = true)
    private String name;
    private Integer exp;
}
