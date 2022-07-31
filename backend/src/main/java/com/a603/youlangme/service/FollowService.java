package com.a603.youlangme.service;

import com.a603.youlangme.config.logging.Logging;
import com.a603.youlangme.entity.Follow;
import com.a603.youlangme.entity.User;
import com.a603.youlangme.repository.FollowRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class FollowService {

    private final FollowRepository followRepository;

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
        return followRepository.findByFollowerAndFollowee(loginUser,userToFollow) != null;
    }

    public Follow searchFollowByFollowerAndFollowee(User follower, User followee) {
        return followRepository.findByFollowerAndFollowee(follower, followee);
    }
}
