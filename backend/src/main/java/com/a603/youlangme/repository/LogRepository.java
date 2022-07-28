package com.a603.youlangme.repository;

import com.a603.youlangme.entity.Log;
import com.a603.youlangme.entity.User;
import com.a603.youlangme.enums.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface LogRepository extends JpaRepository<Log, Long> {
    //List<Log> findAllByUser(User user);

//    @Modifying
//    @Query(value = "update Log l set l.notification = com.a603.youlangme.enums.Notification.OFF where l.user = :user and l.notification = com.a603.youlangme.enums.Notification.ON")
//    void setUserAllNotificationOff(User user);
}
