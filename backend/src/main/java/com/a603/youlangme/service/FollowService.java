package com.a603.youlangme.service;

import com.a603.youlangme.entity.Follow;
import com.a603.youlangme.entity.User;
import com.a603.youlangme.repository.FollowRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.List;

@Service
@RequiredArgsConstructor
public class FollowService {

    private final FollowRepository followRepository;


    public void regist(Follow newFollow) {
        followRepository.save(newFollow);
    }

    public List<Follow> searchFollowByFollowee(User followee) {
        return followRepository.findAllByFollowee(followee);
    }

    public List<Follow> searchFollowByFollower(User follower) {
        return followRepository.findAllByFollower(follower);
    }
}
