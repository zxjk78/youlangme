package com.a603.youlangme.controller;

import com.a603.youlangme.advice.exception.AccessDeniedException;
import com.a603.youlangme.advice.exception.DataNotFoundException;
import com.a603.youlangme.advice.exception.UnAllowedAccessException;
import com.a603.youlangme.advice.exception.UserNotFoundException;
import com.a603.youlangme.dto.follow.FollowFolloweeResponseDto;
import com.a603.youlangme.dto.follow.FollowFollowerFolloweeCntResponseDto;
import com.a603.youlangme.dto.follow.FollowFollowerResponseDto;
import com.a603.youlangme.dto.follow.FollowRegisterRequestDto;
import com.a603.youlangme.entity.Follow;
import com.a603.youlangme.entity.User;
import com.a603.youlangme.response.CommonResult;
import com.a603.youlangme.response.ManyResult;
import com.a603.youlangme.response.OneResult;
import com.a603.youlangme.service.FollowService;
import com.a603.youlangme.service.ResponseService;
import com.a603.youlangme.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

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
        // 이미 팔로우 중인지 확인
        if (followService.isAlreadyFollowed(loginUser, userToFollow)) throw new UnAllowedAccessException();

        Follow newFollow = Follow.builder().follower(loginUser).followee(userToFollow).build();
        followService.regist(newFollow);
        return responseService.getSuccessResult();

    }

    // 팔로우 취소
    @DeleteMapping("/{id}")
    public CommonResult cancleFollow(@PathVariable("id") Long id) {
        // 로그인 유저 가져오기
        SecurityContext context = SecurityContextHolder.getContext();
        Authentication authentication = context.getAuthentication();
        User loginUser = (User) authentication.getPrincipal();

        Follow follow = followService.searchFollowById(id).orElseThrow(DataNotFoundException::new);

        if (loginUser.getId() != follow.getFollower().getId()) throw new AccessDeniedException();

        followService.deleteFollow(id);

        return responseService.getSuccessResult();
    }

    // follower, followee 동시 조회
    @GetMapping("/follower-followee-cnt/{userId}")
    public OneResult<FollowFollowerFolloweeCntResponseDto> countFollowerFollowee(@PathVariable("userId") Long userId) {
        User user = userService.findUserById(userId);
        Integer followerCnt = followService.getFollowerNum(user);
        Integer followeeCnt = followService.getFolloweeNum(user);

        return responseService.getOneResult(
                FollowFollowerFolloweeCntResponseDto
                        .builder()
                        .followerCnt(followerCnt)
                        .followeeCnt(followeeCnt)
                        .build());

    }

    // follower 숫자 불러오기 (이 유저를 follow 하는 사람 숫자)
    @GetMapping("/follower-cnt/{userId}")
    public OneResult<Integer> countFollower(@PathVariable("userId") Long userId) {
        User user = userService.findUserById(userId);
        Integer cnt = followService.getFollowerNum(user);

        return responseService.getOneResult(cnt);
    }

    // followee 숫자 불러오기 (이 유저가 follow 하는 사람 숫자)
    @GetMapping("/followee-cnt/{userId}")
    public OneResult<Integer> countFollowee(@PathVariable("userId") Long userId) {
        User user = userService.findUserById(userId);
        Integer cnt = followService.getFolloweeNum(user);

        return responseService.getOneResult(cnt);
    }

    // follower들 (이 유저를 follow 하는 사람)
    @GetMapping("/followers/{userId}")
    public ManyResult<FollowFollowerResponseDto> listFollower(@PathVariable("userId") Long userId) {
        // 본인만 볼 수 있다면 아래를 추가

        // 로그인 유저 가져오기
//        SecurityContext context = SecurityContextHolder.getContext();
//        Authentication authentication = context.getAuthentication();
//        User loginUser = (User) authentication.getPrincipal();
//
//        if(loginUser.getId() != userId) throw  new UnAllowedAccessException();
//        if(loginUser == null) throw new AccessDeniedException();
//         ------

        User followee = userService.findUserById(userId);

        // follow 당하는 사람을 기준으로 Follow를 찾아서 Follower들을 찾는다.
        List<FollowFollowerResponseDto> followers = followService.searchFollowByFollowee(followee)
                .stream()
                .map(follow -> {
                    User follower = follow.getFollower();
                    return FollowFollowerResponseDto.builder()
                            .id(follow.getId())
                            .followerId(follower.getId())
                            .name(follower.getName())
                            .nationality(follower.getNationality())
                            .image(follower.getImage())
                            .build();
                }).collect(Collectors.toList());


        return responseService.getManyResult(followers);
    }

    // followee들 (이 유저의 followings)
    @GetMapping("/followees/{userId}")
    public ManyResult<FollowFolloweeResponseDto> listFollowee(@PathVariable("userId") Long userId) {
        // 본인만 볼 수 있다면 아래를 추가

        // 로그인 유저 가져오기
//        SecurityContext context = SecurityContextHolder.getContext();
//        Authentication authentication = context.getAuthentication();
//        User loginUser = (User) authentication.getPrincipal();
//
//        if(loginUser.getId() != userId) throw  new UnAllowedAccessException();
//        if(loginUser == null) throw new AccessDeniedException();
//         ------

        User follower = userService.findUserById(userId);

        // follow 당하는 사람을 기준으로 Follow를 찾아서 Follower들을 찾는다.
        List<FollowFolloweeResponseDto> followees = followService.searchFollowByFollower(follower)
                .stream()
                .map(follow -> {
                    User followee = follow.getFollowee();
                    return FollowFolloweeResponseDto.builder()
                            .id(follow.getId())
                            .followeeId(followee.getId())
                            .name(followee.getName())
                            .nationality(followee.getNationality())
                            .image(followee.getImage())
                            .build();
                }).collect(Collectors.toList());


        return responseService.getManyResult(followees);
    }


}
