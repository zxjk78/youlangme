package com.a603.youlangme.cache;

import com.a603.youlangme.enums.Language;
import lombok.Builder;
import lombok.Getter;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;
import org.springframework.data.redis.core.TimeToLive;

import java.io.Serializable;

@Getter
@RedisHash("MeetingSession")
public class MeetingSession implements Serializable {
    @Id
    private String sessionId;

    private Long userId1;
    private Language yourLanguage1;

    private Long userId2;
    private Language yourLanguage2;

    @TimeToLive
    private Long expirationTime = 60*60*24L; // 24 hours

    private Long openLogId;

    @Builder
    public MeetingSession(String sessionId, Long userId1, Long userId2, Language yourLanguage1, Language yourLanguage2, Long openLogId){
        this.sessionId=sessionId;
        this.userId1=userId1;
        this.userId2=userId2;
        this.yourLanguage1 = yourLanguage1;
        this.yourLanguage2 = yourLanguage2;
        this.openLogId = openLogId;
    }
}
