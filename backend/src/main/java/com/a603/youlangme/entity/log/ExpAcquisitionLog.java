package com.a603.youlangme.entity.log;

import com.a603.youlangme.entity.BaseEntity;
import com.a603.youlangme.entity.User;
import com.a603.youlangme.entity.meta.ExpActivity;

import javax.persistence.*;

@Entity
public class ExpAcquisitionLog extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="activity_id")
    private ExpActivity activity;

}
