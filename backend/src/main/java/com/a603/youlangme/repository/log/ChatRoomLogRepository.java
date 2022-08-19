package com.a603.youlangme.repository.log;

import com.a603.youlangme.entity.log.ChatRoomLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChatRoomLogRepository extends JpaRepository<ChatRoomLog,Long> {

    // 특정 세션id로 가장 최근에 OPEN한 로그
//    @Query("select c from ChatRoomLog c where c.sessionId=:sessionId and c.id!=:id")
//    ChatRoomLog findOpenLog(String sessionId, Long id);
//    ChatRoomLog findTop1BySessionIdOrderByCreatedTimeDesc(String sessionId);

}
