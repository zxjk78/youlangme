package com.a603.youlangme.repository.log;

import com.a603.youlangme.entity.User;
import com.a603.youlangme.entity.log.MeetingLog;
import com.a603.youlangme.enums.MeetingLogType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MeetingLogRepository extends JpaRepository<MeetingLog,Long> {

    @Query("select m from MeetingLog m join fetch m.chatRoomLog where m.user = :user")
    List<MeetingLog> findAllByUserWithChatRoomLog(User user);

    Integer countByUser(User user);

    @Query("select m from MeetingLog m join fetch m.chatRoomLog where m.chatRoomLog.id=:id and m.user != :loginUser")
    MeetingLog findOpponentMeetingLog(Long id, User loginUser);
}
