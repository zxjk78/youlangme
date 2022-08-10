package com.a603.youlangme.entity.log;

import com.a603.youlangme.entity.BaseEntity;
import com.a603.youlangme.enums.MeetingLogType;
import com.a603.youlangme.entity.User;
import com.a603.youlangme.enums.Language;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
// MatchingLog -> MeetingLog : 매칭이 아닌 챗룸도 열릴 수 있다.
public class MeetingLog extends BaseEntity {

    // 단방향 매핑
    @ManyToOne(fetch = FetchType.LAZY)
    private User user;

    @Enumerated(EnumType.STRING)
    private Language yourLanguage;

    @Enumerated(EnumType.STRING)
    private MeetingLogType logType;

    // 매칭된 양 사용자의 로그는 하나의 챗룸 로그를 참조한다.
    // 챗룸의 세션 아이디, 열린 시간, 닫힌 시간 등 공유되는 값을 참조하기 위함이다.
    @ManyToOne(fetch = FetchType.LAZY)
    private ChatRoomLog chatRoomLog;

}
