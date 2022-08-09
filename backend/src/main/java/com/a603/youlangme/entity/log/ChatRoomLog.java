package com.a603.youlangme.entity.log;

import com.a603.youlangme.entity.BaseEntity;
import com.a603.youlangme.enums.ChatRoomLogType;
import lombok.Getter;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;

@Entity
@Getter
public class ChatRoomLog extends BaseEntity {

    private String sessionId;

    @Enumerated(EnumType.STRING)
    private ChatRoomLogType logType;

}
