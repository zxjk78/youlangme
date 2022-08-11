package com.a603.youlangme.controller;

import com.a603.youlangme.dto.feed.FeedResponseDto;
import com.a603.youlangme.entity.User;
import com.a603.youlangme.repository.FeedRepository;
import com.a603.youlangme.repository.log.LogRepository;
import com.a603.youlangme.repository.UserRepository;
import com.a603.youlangme.response.CommonResult;
import com.a603.youlangme.response.ManyResult;
import com.a603.youlangme.service.ResponseService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/feed")
@RequiredArgsConstructor
public class FeedController {

    private final LogRepository logRepository;
    private final ResponseService responseService;
    private final UserRepository userRepository;
    private final FeedRepository feedRepository;

    @GetMapping
    public ManyResult<FeedResponseDto> readFeeds() {
        SecurityContext context = SecurityContextHolder.getContext();
        Authentication authentication = context.getAuthentication();
        User loginUser = (User) authentication.getPrincipal();
        User user = userRepository.findById(loginUser.getId()).orElse(null);
        List<FeedResponseDto> feeds = user.getFeedList().stream().map(
                feed -> new FeedResponseDto(feed.getLog().getActor().getName(), feed.getLog().getActor().getId(), feed.getLog().getLogType(), feed.getLog().getDetail(), feed.getNotification())
        ).collect(Collectors.toList());

//        List<FeedResponseDto> logs = logRepository.findAllByUser(loginUser).stream().map(
//                log -> new FeedResponseDto(log.getSubject().getName(), log.getSubject().getId(), log.getLogType(), log.getDetail())
//        ).collect(Collectors.toList());

        return responseService.getManyResult(feeds);
    }

    @PutMapping
    @Transactional
    public CommonResult updateFeeds() {
        SecurityContext context = SecurityContextHolder.getContext();
        Authentication authentication = context.getAuthentication();
        User loginUser = (User) authentication.getPrincipal();

        feedRepository.setUserAllNotificationOff(loginUser);

        //logRepository.setUserAllNotificationOff(loginUser);
        return responseService.getSuccessResult();
    }

}
