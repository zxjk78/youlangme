package com.a603.youlangme.repository.log;

import com.a603.youlangme.entity.log.FeedLog;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LogRepository extends JpaRepository<FeedLog, Long> {
    //List<Log> findAllByUser(User user);

//    @Modifying
//    @Query(value = "update Log l set l.notification = com.a603.youlangme.enums.Notification.OFF where l.user = :user and l.notification = com.a603.youlangme.enums.Notification.ON")
//    void setUserAllNotificationOff(User user);
}

