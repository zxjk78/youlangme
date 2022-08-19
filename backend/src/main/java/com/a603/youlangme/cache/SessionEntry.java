package com.a603.youlangme.cache;

import com.a603.youlangme.enums.Language;
import lombok.Builder;
import lombok.Getter;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;
import org.springframework.data.redis.core.TimeToLive;

import java.io.Serializable;

@Getter
@RedisHash("SessionEntry")
public class SessionEntry implements Serializable {
    @Id
    private String sessionId;
    private Long firstEnteredUserId;
    private Language firstUserYourLanguage;

    @TimeToLive
    private Long expirationTime = 30L; // 30 seconds

    @Builder
    public SessionEntry(String sessionId, Long firstEnteredUserId, Language firstUserYourLanguage){
        this.sessionId=sessionId;
        this.firstEnteredUserId=firstEnteredUserId;
        this.firstUserYourLanguage=firstUserYourLanguage;
    }
}
