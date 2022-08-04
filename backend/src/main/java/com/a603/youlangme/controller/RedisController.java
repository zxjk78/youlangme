package com.a603.youlangme.controller;

import com.a603.youlangme.dto.chat.UserLogResponseDto;
import com.a603.youlangme.response.ManyResult;
import com.a603.youlangme.service.RedisService;
import com.a603.youlangme.service.ResponseService;
import org.springframework.beans.factory.annotation.Autowired;
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
        return responseService.getManyResult(redisService.TopLanguage(id));
      }

}
