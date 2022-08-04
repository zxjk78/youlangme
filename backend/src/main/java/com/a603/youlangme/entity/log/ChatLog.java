package com.a603.youlangme.entity.log;

import com.a603.youlangme.entity.BaseEntity;
import lombok.*;
import org.springframework.data.redis.core.RedisHash;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import java.io.Serializable;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ChatLog extends BaseEntity implements Serializable {

    private String topic;

    private Long point;

    @OneToOne
    private UserLog userLog;

    @OneToOne
    private UserLog userLog2;

    private String lang;

    private String lang2;
}
