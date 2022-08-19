package com.a603.youlangme.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Follow extends BaseEntity{

    @JoinColumn(name="follower_id")
    @ManyToOne(fetch = FetchType.LAZY)
    private User follower;

    @JoinColumn(name="followee_id")
    @ManyToOne(fetch = FetchType.LAZY)
    private User followee;

}
