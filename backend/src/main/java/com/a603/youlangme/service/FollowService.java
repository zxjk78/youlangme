package com.a603.youlangme.service;

import com.a603.youlangme.advice.exception.UserNotFoundException;
import com.a603.youlangme.config.logging.Logging;
import com.a603.youlangme.dto.follow.FollowCandidate;
import com.a603.youlangme.dto.follow.FollowRecommendResponseDto;
import com.a603.youlangme.entity.Follow;
import com.a603.youlangme.entity.User;
import com.a603.youlangme.repository.FollowRepository;
import com.a603.youlangme.repository.UserRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import net.minidev.json.JSONObject;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClientBuilder;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.security.NoSuchAlgorithmException;
import java.util.*;

@Service
@RequiredArgsConstructor
public class FollowService {

    private final FollowRepository followRepository;
    private final UserRepository userRepository;

    @Value("${url.server.matching}")
    private String MATCHING_SERVER_URL;

    @Logging
    public Long saveFollow(Follow newFollow) {
        return followRepository.save(newFollow).getFollowee().getId();
    }

    public Optional<Follow> searchFollowById(Long id) {
        return followRepository.findById(id);
    }

    public List<Follow> searchFollowByFollowee(User followee) {
        return followRepository.findAllByFollowee(followee);
    }

    public List<Follow> searchFollowByFollower(User follower) {
        return followRepository.findAllByFollower(follower);
    }

    public Integer getFollowerNum(User user) {
        return followRepository.countByFollowee(user);
    }

    public Integer getFolloweeNum(User user) {
        return followRepository.countByFollower(user);
    }

    public void deleteFollow(Long id) {
        followRepository.deleteById(id);
    }

    public boolean isAlreadyFollowed(User loginUser, User userToFollow) {
        return followRepository.findByFollowerAndFollowee(loginUser, userToFollow) != null;
    }

    public Follow searchFollowByFollowerAndFollowee(User follower, User followee) {
        return followRepository.findByFollowerAndFollowee(follower, followee);
    }


    public List<FollowRecommendResponseDto> getFollowRecommendation(User loginUser) throws Exception {
        List<FollowCandidate> followCandidates = getFollowRecommendationAPI(loginUser);

        List<FollowRecommendResponseDto> res = new ArrayList<>();
        // 이미 팔로우한 유저 제외 3명
        int cnt=0;
        for(FollowCandidate fc : followCandidates) {
            // 이미 팔로우한 유저인지 검사
            boolean alreadyFollowed = isAlreadyFollowed(loginUser, userRepository.getReferenceById(fc.getId()));
            if(alreadyFollowed) continue;
            User candidate = userRepository.findById(fc.getId()).orElse(null);
            if(candidate==null) continue;
            res.add(FollowRecommendResponseDto.builder().
                    userId(candidate.getId()).
                    userName(candidate.getName()).
                    build());
            if(++cnt==3) break;
        }

        return res;
    }

    @Cacheable(value="FollowRecommend", key="{#loginUser.getId()}", cacheManager = "followRecommendCacheManager")
    public List<FollowCandidate> getFollowRecommendationAPI(User loginUser) throws JsonProcessingException, NoSuchAlgorithmException {

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

        JSONObject bodyJson = new JSONObject();
        bodyJson.put("id", loginUser.getId());

        ResponseEntity<String> response = restTemplate.postForEntity(MATCHING_SERVER_URL + "/recommend", bodyJson, String.class);

        ObjectMapper mapper = new ObjectMapper();
        Map<String, Double> map = mapper.readValue(response.getBody(), Map.class);
        ArrayList<FollowCandidate> candidates = new ArrayList<>();
        for (String key : map.keySet()) {
            candidates.add(FollowCandidate.of(Long.parseLong(key), map.get(key)));
        }
        candidates.sort((c1,c2)->c2.getSim().compareTo(c1.getSim()));

        return candidates.subList(0,Math.min(30, candidates.size()));
    }


}
