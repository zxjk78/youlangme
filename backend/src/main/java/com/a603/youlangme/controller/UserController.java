package com.a603.youlangme.controller;

import com.a603.youlangme.dto.user.UserCheckEmailRequestDto;
import com.a603.youlangme.dto.user.UserCheckNameRequestDto;
import com.a603.youlangme.dto.user.UserSetBasicInfoRequestDto;
import com.a603.youlangme.entity.Favorite;
import com.a603.youlangme.entity.User;
import com.a603.youlangme.enums.Language;
import com.a603.youlangme.enums.Nationality;
import com.a603.youlangme.response.CommonResult;
import com.a603.youlangme.service.ResponseService;
import com.a603.youlangme.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/user")
public class UserController {

    private final UserService userService;
    private final ResponseService responseService;

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

        log.info("=3=3=3==3=3=="+userSetBasicInfoRequestDto.toString());
        userService.updateBasicInfo(loginUser.getId(), userSetBasicInfoRequestDto);



        return responseService.getSuccessResult();
    }


}
