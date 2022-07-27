package com.a603.youlangme.entity;

import com.a603.youlangme.enums.LogType;
import com.a603.youlangme.enums.Notification;
import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Log extends BaseEntity{

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "log_type")
    @Enumerated(EnumType.STRING)
    private LogType logType;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "subject_id")
    private User subject;

    @Column(name = "notification")
    @Enumerated(EnumType.STRING)
    private Notification notification;

    private Long detail;

}
