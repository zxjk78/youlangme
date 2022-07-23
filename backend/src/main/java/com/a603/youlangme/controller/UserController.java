package com.a603.youlangme.controller;

import com.a603.youlangme.advice.exception.UserNotFoundException;
import com.a603.youlangme.dto.badge.BadgeRequestDto;
import com.a603.youlangme.dto.badge.BadgeResponseDto;
import com.a603.youlangme.dto.user.*;
import com.a603.youlangme.entity.Favorite;
import com.a603.youlangme.entity.User;
import com.a603.youlangme.enums.Language;
import com.a603.youlangme.enums.Nationality;
import com.a603.youlangme.response.CommonResult;
import com.a603.youlangme.response.ManyResult;
import com.a603.youlangme.response.OneResult;
import com.a603.youlangme.service.ResponseService;
import com.a603.youlangme.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.awt.*;
import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/user")
public class UserController {

    private final UserService userService;
    private final ResponseService responseService;


    // 유저 정보 조회 (유저 테이블)
    @GetMapping("/{id}")
    public OneResult<UserEntireInfoResponseDto> getEntireInfo(@PathVariable("id") Long id) {

        User user = userService.findUserById(id);
        if(user==null) throw new UserNotFoundException();
        return responseService.getOneResult(new UserEntireInfoResponseDto(user));
    }


    // 이메일 중복 체크
    @GetMapping("/check-email")
    public CommonResult checkEmail(@RequestParam("email") String emailToCheck) {
        User user = userService.findUserByEmail(emailToCheck);

        // 있으면(중복이면) true
        return responseService.getOneResult(user!=null);
    }

    // 이름 중복 체크
    @GetMapping("/check-name")
    public CommonResult checkName(@RequestParam("name") String nameToCheck) {
        User user = userService.findUserByName(nameToCheck);

        // 있으면(중복이면) true
        return responseService.getOneResult(user!=null);
    }

    // 사용자 기본 정보 저장
    @PostMapping("/basic-info")
    public CommonResult setBasicInfo(@RequestBody UserSetBasicInfoRequestDto userSetBasicInfoRequestDto){

        // 로그인 유저 가져오기
        SecurityContext context = SecurityContextHolder.getContext();
        Authentication authentication = context.getAuthentication();
        User loginUser = (User) authentication.getPrincipal();

        userService.updateBasicInfo(loginUser.getId(), userSetBasicInfoRequestDto);

        return responseService.getSuccessResult();
    }

    // Profile Start

    @GetMapping("/description/{id}") // Read
    public OneResult<String> getUserDescription (@PathVariable(value ="id") Long userId) {
        return responseService.getOneResult(userService.readUserDescription(userId));
    }

    @PutMapping("/description") // Update
    public CommonResult setUserDescription (@RequestBody Map<String, String> descriptionMap) {
        SecurityContext context = SecurityContextHolder.getContext();
        Authentication authentication = context.getAuthentication();
        User loginUser = (User) authentication.getPrincipal();
        userService.updateUserDescription(loginUser.getId(), descriptionMap.get("description"));

        return responseService.getSuccessResult();
    }

    @GetMapping("/image/{id}") // Read
    public OneResult<String> getUserImage (@PathVariable(value = "id") Long userId) {
        System.out.println("=========1==========1============1=====");
        return responseService.getOneResult(userService.readUserImage(userId));
    }

    @PutMapping("/image") // Update
    public OneResult<String> setUserImage (@RequestParam("imageFile") MultipartFile file) throws IOException {
        SecurityContext context = SecurityContextHolder.getContext();
        Authentication authentication = context.getAuthentication();
        User loginUser = (User) authentication.getPrincipal();

        return responseService.getOneResult(userService.updateUserImage(loginUser.getId(), file));
    }

    @GetMapping("/profile/{id}") // Read
    public OneResult<UserProfileResponseDto> getUserProfile (@PathVariable(value ="id") Long id) {
        UserProfileResponseDto userProfileResponseDto = userService.readUserProfile(id);
        return responseService.getOneResult(userProfileResponseDto);
    }


    @GetMapping("/badge/{id}") // Read
    public ManyResult<BadgeResponseDto> getUserBadgeList (@PathVariable(value ="id") Long userId) {
        return responseService.getManyResult(userService.readBadgeList(userId));
    }

    @PutMapping("/badge") // Update
    public CommonResult setUserBadgeList(@RequestBody List<BadgeRequestDto> badgeRequestDtoList) {
        SecurityContext context = SecurityContextHolder.getContext();
        Authentication authentication = context.getAuthentication();
        User loginUser = (User) authentication.getPrincipal();

        userService.updateBadgeList(loginUser.getId(), badgeRequestDtoList);
        return responseService.getSuccessResult();
    }


    // Profile End


}
