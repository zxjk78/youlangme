package com.a603.youlangme.controller;

import com.a603.youlangme.aop.LoginUser;
import com.a603.youlangme.dto.meeting.MeetingEnterRequestDto;
import com.a603.youlangme.entity.User;
import com.a603.youlangme.enums.Language;
import com.a603.youlangme.response.CommonResult;
import com.a603.youlangme.service.MeetingService;
import com.a603.youlangme.service.ResponseService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

@RestController
@RequiredArgsConstructor
@RequestMapping("/meeting")
public class MeetingController {

    private final MeetingService meetingService;
    private final ResponseService responseService;

    @PostMapping("/enter/{session_id}")
    public CommonResult enterMeeting(@PathVariable("session_id") String sessionId,
                                     @RequestBody MeetingEnterRequestDto meetingEnterRequestDto,
                                     @ApiIgnore @LoginUser User loginUser){
        Language yourLanguage = meetingEnterRequestDto.getYourLanguage();
        meetingService.enterMeeting(sessionId, loginUser.getId(), yourLanguage);

        return responseService.getSuccessResult();
    }

    @DeleteMapping("/end/{session_id}")
    public CommonResult endMeeting(@PathVariable("session_id") String sessionId,
                                     @ApiIgnore @LoginUser User loginUser){
        meetingService.endMeeting(sessionId);

        return responseService.getSuccessResult();
    }


}
