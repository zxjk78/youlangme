package com.a603.youlangme.controller;

import com.a603.youlangme.advice.exception.AccessDeniedException;
import com.a603.youlangme.advice.exception.UnAllowedAccessException;
import com.a603.youlangme.advice.exception.UserNotFoundException;
import com.a603.youlangme.dto.follow.FollowRegisterRequestDto;
import com.a603.youlangme.entity.Follow;
import com.a603.youlangme.entity.User;
import com.a603.youlangme.response.CommonResult;
import com.a603.youlangme.response.OneResult;
import com.a603.youlangme.service.FollowService;
import com.a603.youlangme.service.ResponseService;
import com.a603.youlangme.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/follow")
@RequiredArgsConstructor
@Slf4j
public class FollowController {

    private final FollowService followService;
    private final UserService userService;

    private final ResponseService responseService;


    // 팔로우 추가
    @PostMapping()
    public CommonResult registFollow(@RequestBody FollowRegisterRequestDto followRegisterRequestDto) {
        // 로그인 유저 가져오기
        SecurityContext context = SecurityContextHolder.getContext();
        Authentication authentication = context.getAuthentication();
        User loginUser = (User) authentication.getPrincipal();

        User userToFollow = userService.findUserById(followRegisterRequestDto.getUserIdToFollow());

        if (loginUser == null) throw new AccessDeniedException();
        if (userToFollow == null) throw new UserNotFoundException();
        if (loginUser.getId() == userToFollow.getId()) throw new UnAllowedAccessException();

        Follow newFollow = Follow.builder().follower(loginUser).followee(userToFollow).build();
        followService.regist(newFollow);
        return responseService.getSuccessResult();

    }
}
