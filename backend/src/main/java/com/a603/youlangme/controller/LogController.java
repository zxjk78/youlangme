package com.a603.youlangme.controller;

import com.a603.youlangme.dto.badge.BadgeRequestDto;
import com.a603.youlangme.dto.log.LogResponseDto;
import com.a603.youlangme.entity.Log;
import com.a603.youlangme.entity.User;
import com.a603.youlangme.enums.Notification;
import com.a603.youlangme.repository.LogRepository;
import com.a603.youlangme.repository.UserRepository;
import com.a603.youlangme.response.CommonResult;
import com.a603.youlangme.response.ManyResult;
import com.a603.youlangme.response.OneResult;
import com.a603.youlangme.service.ResponseService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/log")
@RequiredArgsConstructor
public class LogController {

    private final LogRepository logRepository;
    private final ResponseService responseService;


    @GetMapping
    public ManyResult<LogResponseDto> readLogs() {
        SecurityContext context = SecurityContextHolder.getContext();
        Authentication authentication = context.getAuthentication();
        User loginUser = (User) authentication.getPrincipal();

        List<LogResponseDto> logs = logRepository.findAllByUser(loginUser).stream().map(
                log -> new LogResponseDto(log.getSubject().getName(), log.getSubject().getId(), log.getLogType(), log.getDetail())
        ).collect(Collectors.toList());

        return responseService.getManyResult(logs);
    }

    @PutMapping
    @Transactional
    public CommonResult updateLogs() {
        SecurityContext context = SecurityContextHolder.getContext();
        Authentication authentication = context.getAuthentication();
        User loginUser = (User) authentication.getPrincipal();

        logRepository.setUserAllNotificationOff(loginUser);
        return responseService.getSuccessResult();
    }

}
