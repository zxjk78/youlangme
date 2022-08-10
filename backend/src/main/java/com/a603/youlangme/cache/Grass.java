package com.a603.youlangme.cache;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;
import org.springframework.data.redis.core.TimeToLive;

import java.io.Serializable;

@Getter
@NoArgsConstructor
public class Grass implements Serializable {


    private String day;

    private int value;

    @Builder
    public Grass(String day,int value){
        this.day=day;
        this.value=value;
    }
}
