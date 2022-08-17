package com.a603.youlangme.entity.meta;

import com.a603.youlangme.entity.BaseEntity;
import com.a603.youlangme.enums.ExpUpdateType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;

@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
public class ExpActivity extends BaseEntity {

    @Column(unique = true, length=20)
    private String name;
    private Integer exp;

    @Enumerated(EnumType.STRING)
    @Column(length=20)
    private ExpUpdateType expUpdateType;
}
