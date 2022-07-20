package com.a603.youlangme.service;

import com.a603.youlangme.entity.Follow;
import com.a603.youlangme.repository.FollowRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class FollowService {

    private final FollowRepository followRepository;


    public void regist(Follow newFollow) {
        followRepository.save(newFollow);
    }
}
