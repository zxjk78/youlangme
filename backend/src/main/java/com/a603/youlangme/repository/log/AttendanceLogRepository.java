package com.a603.youlangme.repository.log;

import com.a603.youlangme.entity.User;
import com.a603.youlangme.entity.log.AttendanceLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AttendanceLogRepository extends JpaRepository<AttendanceLog, Long> {

    AttendanceLog findTop1ByUserOrderByCreatedTimeDesc(User user);
    Integer countByUser(User user);
}
