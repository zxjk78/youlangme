package com.a603.youlangme.entity.log;

import com.a603.youlangme.entity.BaseEntity;
import com.a603.youlangme.enums.ChatRoomLogType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ChatRoomLog extends BaseEntity {

    private String sessionId;

    @Enumerated(EnumType.STRING)
    @Column(length=20)
    private ChatRoomLogType logType;

    @OneToMany(mappedBy = "chatRoomLog", cascade = CascadeType.ALL)
    List<MeetingLog> meetingLogs = new ArrayList<>();

    private Long openLogId;

}
