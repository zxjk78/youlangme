package com.a603.youlangme.entity;

import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;

import javax.persistence.Entity;

@Entity
@AllArgsConstructor
public class Log extends BaseEntity{
    private Long userId;

    private String action;

    private Long targetId;
}
