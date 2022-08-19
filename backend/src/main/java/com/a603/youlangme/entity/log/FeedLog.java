package com.a603.youlangme.entity.log;

import com.a603.youlangme.entity.BaseEntity;
import com.a603.youlangme.entity.User;
import com.a603.youlangme.enums.LogType;
import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FeedLog extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "actor_id")
    private User actor;

    @Column(name = "log_type", length = 20)
    @Enumerated(EnumType.STRING)
    private LogType logType;

//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "subject_id")
//    private User subject;

    private Long detail;
}
