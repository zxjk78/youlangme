package com.a603.youlangme.entity;


import com.a603.youlangme.entity.log.FeedLog;
import com.a603.youlangme.enums.Notification;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class Feed extends BaseEntity{

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "feed_log_id")
    private FeedLog feedLog;

    @Column(name = "notification", length = 20)
    @Enumerated(EnumType.STRING)
    private Notification notification;
}
