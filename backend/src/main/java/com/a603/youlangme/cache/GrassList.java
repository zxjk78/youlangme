package com.a603.youlangme.cache;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;
import org.springframework.data.redis.core.TimeToLive;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Getter
@NoArgsConstructor
@RedisHash("GrassList")
public class GrassList implements Serializable {

    @Id
    private Long id;

    private List<Grass>grassList=new ArrayList<>();

    @TimeToLive
    private Long expirationTime=60*10L; //10분

}
