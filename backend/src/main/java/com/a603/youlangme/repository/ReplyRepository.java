package com.a603.youlangme.repository;

import com.a603.youlangme.entity.Reply;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReplyRepository extends JpaRepository<Reply,Long> {

//    @Query("select r.replyId, r.contents from Reply r left join Board b where b.board_id= :board_id")
//    List<Reply>replyList();
    //@Query("select r.contents from Reply r left join Board b where r.boardId=b.id Order by r.createdTime And r.pid")
    List<Reply> findAllByBoardIdOrderByPidAscCreatedTimeAsc(Long boardId);

}
