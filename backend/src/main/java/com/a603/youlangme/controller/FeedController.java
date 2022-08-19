package com.a603.youlangme.controller;

import com.a603.youlangme.dto.feed.FeedPageResponseDto;
import com.a603.youlangme.dto.feed.FeedResponseDto;
import com.a603.youlangme.entity.Board;
import com.a603.youlangme.entity.BoardImg;
import com.a603.youlangme.entity.Feed;
import com.a603.youlangme.entity.User;
import com.a603.youlangme.entity.log.FeedLog;
import com.a603.youlangme.enums.LogType;
import com.a603.youlangme.repository.*;
import com.a603.youlangme.repository.FeedRepository;
import com.a603.youlangme.repository.log.LogRepository;
import com.a603.youlangme.repository.UserRepository;
import com.a603.youlangme.response.CommonResult;
import com.a603.youlangme.response.ManyResult;
import com.a603.youlangme.response.OneResult;
import com.a603.youlangme.service.FeedService;
import com.a603.youlangme.service.ResponseService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
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
    private final BoardRepository boardRepository;

    private final BoardImgRepository boardImgRepository;

    private final FeedService feedService;

//    @GetMapping
//    public ManyResult<FeedResponseDto> readFeeds() {
//        SecurityContext context = SecurityContextHolder.getContext();
//        Authentication authentication = context.getAuthentication();
//        User loginUser = (User) authentication.getPrincipal();
//        User user = userRepository.findById(loginUser.getId()).orElse(null);
//
//        List<FeedResponseDto> feeds = user.getFeedList().stream().map(
//                feed -> new FeedResponseDto(feed.getFeedLog().getActor().getName(), feed.getFeedLog().getActor().getId(), feed.getFeedLog().getLogType(), feed.getFeedLog().getDetail(), feed.getNotification())
//        ).collect(Collectors.toList());
//
//        return responseService.getManyResult(feeds);
//    }


    @GetMapping
    public OneResult<FeedPageResponseDto> readFeeds() {
        SecurityContext context = SecurityContextHolder.getContext();
        Authentication authentication = context.getAuthentication();
        User loginUser = (User) authentication.getPrincipal();
        User user = userRepository.findById(loginUser.getId()).orElse(null);

        FeedPageResponseDto feedPageResponseDto = feedService.getFeeds(user);
        return responseService.getOneResult(feedPageResponseDto);
    }

    @GetMapping("/more")
    public OneResult<FeedPageResponseDto> readMoreFeeds(@RequestParam Long id) {
        SecurityContext context = SecurityContextHolder.getContext();
        Authentication authentication = context.getAuthentication();
        User loginUser = (User) authentication.getPrincipal();
        User user = userRepository.findById(loginUser.getId()).orElse(null);

        FeedPageResponseDto feedPageResponseDto = feedService.getMoreFeeds(user, id);
        return responseService.getOneResult(feedPageResponseDto);
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
