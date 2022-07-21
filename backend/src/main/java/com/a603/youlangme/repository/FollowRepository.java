package com.a603.youlangme.repository;

import com.a603.youlangme.entity.Follow;
import com.a603.youlangme.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FollowRepository extends JpaRepository<Follow,Long> {

    List<Follow> findAllByFollowee(User followee);
    List<Follow> findAllByFollower(User follower);
    Integer countByFollowee(User user);
    Integer countByFollower(User user);
    Follow findByFollowerAndFollowee(User loginUser, User userToFollow);
}
