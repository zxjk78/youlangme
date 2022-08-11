package com.a603.youlangme.entity.log;

import com.a603.youlangme.entity.BaseEntity;
import com.a603.youlangme.entity.User;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.ManyToOne;

@Entity
@Getter
public class AttendanceLog extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    private User user;

    static public AttendanceLog of(User user){
        AttendanceLog log = new AttendanceLog();
        log.user = user;
        return log;
    }
}
