package com.a603.youlangme.controller;

import com.a603.youlangme.dto.matching.MatchingRequestDto;
import com.a603.youlangme.dto.matching.MatchingResponseDto;
import com.a603.youlangme.entity.User;
import com.a603.youlangme.response.CommonResult;
import com.a603.youlangme.response.OneResult;
import com.a603.youlangme.service.ResponseService;
import com.a603.youlangme.service.UserService;
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

import java.security.NoSuchAlgorithmException;
import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/match")
@RequiredArgsConstructor
public class MatchingController {

    private final ResponseService responseService;
    private final UserService userService;


    @ResponseBody
    @PostMapping
    @Transactional
    public OneResult<MatchingResponseDto> requestMatching(@RequestBody MatchingRequestDto matchingRequestDto) throws JsonProcessingException, NoSuchAlgorithmException {
        SecurityContext context = SecurityContextHolder.getContext();
        Authentication authentication = context.getAuthentication();
        User loginUser = (User) authentication.getPrincipal();
        User user = userService.findUserById(loginUser.getId());
        HashMap<String, Object> resultMap = new HashMap<>();

            HttpComponentsClientHttpRequestFactory factory = new HttpComponentsClientHttpRequestFactory();
            factory.setConnectTimeout(500000);
            factory.setReadTimeout(500000);

            CloseableHttpClient httpClient = HttpClientBuilder.create()
                    .setMaxConnTotal(50)
                    .setMaxConnPerRoute(20).build();
            factory.setHttpClient(httpClient);

            RestTemplate restTemplate = new RestTemplate(factory);


            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            JSONObject bodyJson = new JSONObject();
            bodyJson.put("id", user.getId());
            bodyJson.put("mylanguage", matchingRequestDto.getMylanguage());
            bodyJson.put("yourlanguage", matchingRequestDto.getYourlanguage());
            bodyJson.put("age", user.getAge());
            bodyJson.put("gender", user.getGender());
            bodyJson.put("nationality", user.getNationality());
            bodyJson.put("favorites", user.getUserFavorites().stream().map(
                    userFavorite -> userFavorite.getFavorite().getId()
            ).collect(Collectors.toList()));

            ResponseEntity<String> response = restTemplate.postForEntity("http://localhost:8000/matchmaking", bodyJson, String.class);

            ObjectMapper mapper = new ObjectMapper();
            Map<String, Object> map = mapper.readValue(response.getBody(), Map.class);


        return responseService.getOneResult(new MatchingResponseDto(SHA256.encrypt((String)map.get("sessionId")), Long.parseLong((String)map.get("opponentId")), (String)map.get("message")));
    }
}
