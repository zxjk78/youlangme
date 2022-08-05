package com.a603.youlangme.controller;

import com.a603.youlangme.dto.ranking.RankLogResponseDto;
import com.a603.youlangme.dto.ranking.UserLogResponseDto;
import com.a603.youlangme.entity.User;
import com.a603.youlangme.response.ManyResult;
import com.a603.youlangme.service.RedisService;
import com.a603.youlangme.service.ResponseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/redis")
public class RedisController {

    @Autowired
    RedisService redisService;

    @Autowired
    ResponseService responseService;

    @GetMapping("/langList")
    public ManyResult<UserLogResponseDto> LanguageList(Long id){
//        SecurityContext context = SecurityContextHolder.getContext();
//        Authentication authentication = context.getAuthentication();
//        User user=((User)authentication.getPrincipal());
        return responseService.getManyResult(redisService.TopLanguage(id));
    }

    @GetMapping("/rankList")
    public ManyResult<RankLogResponseDto>RankingList(Long id){
        SecurityContext context = SecurityContextHolder.getContext();
        Authentication authentication = context.getAuthentication();
        User user=((User)authentication.getPrincipal());
        return responseService.getManyResult(redisService.RankList(id,user.getId()));
    }

}
