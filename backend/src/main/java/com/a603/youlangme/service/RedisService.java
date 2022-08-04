package com.a603.youlangme.service;

import com.a603.youlangme.dto.chat.UserLogResponseDto;
import com.a603.youlangme.entity.log.UserLog;
import com.a603.youlangme.repository.ChatRepository;
import com.a603.youlangme.repository.UserLogRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Slf4j
public class RedisService {

    @Autowired
    RedisTemplate redisTemplate1;

    @Autowired
    ChatRepository chatRepository;

    @Autowired
    UserLogRepository userLogRepository;

    @Cacheable(value = "userLogList",key = "{#id}",cacheManager = "cacheManager")
    public List<UserLogResponseDto>TopLanguage(Long id){
        System.out.println("1111111111111111111");

        List<UserLog>userLogList= (List<UserLog>) userLogRepository.findAll();

        int total=userLogList.size();

        HashMap<String,Integer>map=new HashMap<>();

        for(UserLog userLog:userLogList){
            String lang=userLog.getWantLanguage();
            map.put(lang,map.getOrDefault(lang,0)+1);
        }

        PriorityQueue<Lang>pq=new PriorityQueue<>();

        for(String lang: map.keySet()){
            pq.add(new Lang(lang,map.get(lang)));
        }

        List<UserLogResponseDto>result=new ArrayList<>();
        for(int i=0;i<3;i++){
            Lang lang=pq.poll();
            String l=lang.language;
            int p= lang.per;
            UserLogResponseDto userLogResponseDto=new UserLogResponseDto();
            userLogResponseDto.setLanguage(l);
            userLogResponseDto.setPercent((p/(total*2.0))*100.0);
            result.add(userLogResponseDto);
        }
        return result;
    }
}

class Lang implements Comparable<Lang>{
    String language;
    int per;
    Lang(String language,int per){
        this.language=language;
        this.per=per;
    }

    public int compareTo(Lang l){
        return l.per-this.per;
    }
}
