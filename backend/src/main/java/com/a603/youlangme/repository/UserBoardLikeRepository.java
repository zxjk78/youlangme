package com.a603.youlangme.repository;

import com.a603.youlangme.entity.Board;
import com.a603.youlangme.entity.User;
import com.a603.youlangme.entity.UserBoardLike;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserBoardLikeRepository extends JpaRepository<UserBoardLike, Long> {
    void deleteByUserAndBoard(User user, Board board);
    List<UserBoardLike> findAllByUserId(Long userId);
    List<UserBoardLike> findAllByBoardId(Long boardId);
}
