package com.a603.youlangme.repository;

import com.a603.youlangme.dto.grass.GrassResponseDto;
import com.a603.youlangme.entity.Board;
import com.a603.youlangme.entity.Reply;
import com.a603.youlangme.entity.User;
import com.a603.youlangme.entity.log.MeetingLog;
import com.a603.youlangme.enums.MeetingLogType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByName(String name);
    Optional<User> findByEmail(String email);

    @Query("select b from Board b where b.author.id =:id order by createdTime asc")
    List<Board>findBoard(@Param("id") Long id);

    @Query("select r from Reply r where r.user.id =:id order by createdTime asc")
    List<Reply>findReply(@Param("id") Long id);

    @Query("select m from MeetingLog m where m.user.id =:id and m.logType =:end order by createdTime asc")
    List<MeetingLog>findMeeting(@Param("id") Long id,@Param("end") MeetingLogType end);

}
