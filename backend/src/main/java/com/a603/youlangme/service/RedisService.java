package com.a603.youlangme.service;

import com.a603.youlangme.advice.exception.BoardNotFoundException;
import com.a603.youlangme.advice.exception.LevelNotFoundException;
import com.a603.youlangme.advice.exception.UserLogNotFoundException;
import com.a603.youlangme.advice.exception.UserNotFoundException;
import com.a603.youlangme.dto.ranking.RankLogResponseDto;
import com.a603.youlangme.dto.ranking.UserLogResponseDto;
import com.a603.youlangme.entity.User;
import com.a603.youlangme.entity.UserExp;
import com.a603.youlangme.entity.log.UserLog;
import com.a603.youlangme.entity.meta.Level;
import com.a603.youlangme.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.core.parameters.P;
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
    UserRepository userRepository;

    @Autowired
    UserLogRepository userLogRepository;

    @Autowired
    UserExpRepository userExpRepository;

    @Autowired
    LevelRepository levelRepository;

    @Cacheable(value = "userLogList",key = "{#id}",cacheManager = "cacheManager")
    public List<UserLogResponseDto>TopLanguage(Long id){

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

    @Cacheable(value = "RankUser",key = "{#id}",cacheManager = "cacheRankManager")
    public List<RankLogResponseDto>RankList(Long id,Long userId){
        List<RankLogResponseDto>result=new ArrayList<>();

        List<UserExp>userExpList=userExpRepository.findAll();

        PriorityQueue<Rank>pq=new PriorityQueue<>();

        User user=userRepository.findById(userId).orElseThrow(UserNotFoundException::new);

        Long uid=user.getId(); //마이페이지 유저

        System.out.println(userExpList.size()+" 사이즈");
        for(UserExp userExp:userExpList){
            System.out.println(userExp.getUser().getName()+" "+userExp.getExp());
            pq.add(new Rank(userExp.getUser().getId(),userExp.getUser().getName(),userExp.getExp()));
        }

        while(pq.size()<3){
            return null;
        }

        Rank rank1=pq.poll();
        Rank rank2=pq.poll();
        Rank rank3=pq.poll();

        for(int i=1;i<4;i++){
            RankLogResponseDto rankLogResponseDto=new RankLogResponseDto();
            if(i==1){
                rankLogResponseDto.setId(rank1.id);
                rankLogResponseDto.setRank(i);
                rankLogResponseDto.setLv(rank1.LV);
                rankLogResponseDto.setName(rank1.name);
            }else if(i==2){
                rankLogResponseDto.setId(rank2.id);
                rankLogResponseDto.setRank(i);
                rankLogResponseDto.setLv(rank2.LV);
                rankLogResponseDto.setName(rank2.name);
            }else{
                rankLogResponseDto.setId(rank3.id);
                rankLogResponseDto.setRank(i);
                rankLogResponseDto.setLv(rank3.LV);
                rankLogResponseDto.setName(rank3.name);
            }
            result.add(rankLogResponseDto);
        }

        if(rank1.id!=uid&&rank2.id!=uid&&rank3.id!=uid){
            int ranking=4;
            while(!pq.isEmpty()){
                Rank rank=pq.poll();
                if(rank.id==uid){
                    RankLogResponseDto rankLogResponseDto=new RankLogResponseDto().builder()
                            .id(rank.id)
                            .lv(rank.LV)
                            .name(rank.name)
                            .rank(ranking)
                            .build();
                    result.add(rankLogResponseDto);
                    return  result;
                }else{
                    ranking++;
                    continue;
                }
            }
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

class Rank implements Comparable<Rank>{

    Long id;
    String name;
    int LV;
    Rank(Long id,String name,int LV){
        this.id=id;
        this.name=name;
        this.LV=LV;
    }

    public int compareTo(Rank l){
        return l.LV-this.LV;
    }
}
