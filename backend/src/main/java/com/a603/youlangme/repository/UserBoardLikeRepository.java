package com.a603.youlangme.repository;

import com.a603.youlangme.entity.UserBoardLike;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserBoardLikeRepository extends JpaRepository<UserBoardLike, Long> {
    List<UserBoardLike> findByUserId(Long userId);
}
