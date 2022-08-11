package com.a603.youlangme.controller;

import com.a603.youlangme.aop.LoginUser;
import com.a603.youlangme.dto.matching.MatchingRequestDto;
import com.a603.youlangme.dto.matching.MatchingResponseDto;
import com.a603.youlangme.dto.feedback.FeedbackRequestDto;
import com.a603.youlangme.dto.meeting.MeetingEnterRequestDto;
import com.a603.youlangme.entity.User;
import com.a603.youlangme.enums.Language;
import com.a603.youlangme.response.CommonResult;
import com.a603.youlangme.response.OneResult;
import com.a603.youlangme.service.MeetingService;
import com.a603.youlangme.service.ResponseService;
import com.a603.youlangme.util.SHA256;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import net.minidev.json.JSONObject;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClientBuilder;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import springfox.documentation.annotations.ApiIgnore;

import java.util.Map;

import java.security.NoSuchAlgorithmException;
import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

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

    @PostMapping("/feedback")
    public CommonResult matchingFeedback(@RequestBody FeedbackRequestDto feedbackRequestDto, @ApiIgnore @LoginUser User loginUser) {

        meetingService.saveMatchingFeedback(loginUser.getId(), feedbackRequestDto.getFeedback());

        return responseService.getSuccessResult();
    }
    // news test

    @GetMapping("/news")
    @Transactional
    public CommonResult getNews(@RequestParam("countryName") String country) throws JsonProcessingException, NoSuchAlgorithmException {

        HashMap<String, Object> resultMap = new HashMap<>();

        HttpComponentsClientHttpRequestFactory factory = new HttpComponentsClientHttpRequestFactory();
        factory.setConnectTimeout(50000);
        factory.setReadTimeout(50000);

        CloseableHttpClient httpClient = HttpClientBuilder.create()
                .setMaxConnTotal(50)
                .setMaxConnPerRoute(20).build();
        factory.setHttpClient(httpClient);

        RestTemplate restTemplate = new RestTemplate(factory);


        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        String APIKEY = "413bec14dda64733a04b2f171e99917c";
        ResponseEntity<String> response = restTemplate.getForEntity("https://newsapi.org/v2/everything?q=" + country + "&apiKey=" + APIKEY + "&searchIn=title&pageSize=40", String.class);

        ObjectMapper mapper = new ObjectMapper();
        Map<String, Object> map = mapper.readValue(response.getBody(), Map.class);


        return responseService.getOneResult(map);
    }

}
