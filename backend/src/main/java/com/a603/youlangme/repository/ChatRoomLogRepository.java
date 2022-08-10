package com.a603.youlangme.repository;

import com.a603.youlangme.entity.log.ChatRoomLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ChatRoomLogRepository extends JpaRepository<ChatRoomLog,Long> {

}
