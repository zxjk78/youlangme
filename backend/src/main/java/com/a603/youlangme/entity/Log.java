package com.a603.youlangme.entity;

import com.a603.youlangme.enums.LogType;
import com.a603.youlangme.enums.Notification;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Log extends BaseEntity{

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "actor_id")
    private User actor;

    @Column(name = "log_type")
    @Enumerated(EnumType.STRING)
    private LogType logType;

//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "subject_id")
//    private User subject;

    private Long detail;
}
