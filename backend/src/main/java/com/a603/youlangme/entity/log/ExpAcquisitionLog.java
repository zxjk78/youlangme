package com.a603.youlangme.entity.log;

import com.a603.youlangme.entity.BaseEntity;
import com.a603.youlangme.entity.User;
import com.a603.youlangme.entity.meta.ExpActivity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
public class ExpAcquisitionLog extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="activity_id")
    private ExpActivity activity;

    private Long targetId;

}
