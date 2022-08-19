package com.a603.youlangme.repository;

import com.a603.youlangme.entity.Feed;
import com.a603.youlangme.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FeedRepository extends JpaRepository<Feed, Long> {
    @Modifying
    @Query(value = "update Feed f set f.notification = com.a603.youlangme.enums.Notification.OFF where f.user = :user and f.notification = com.a603.youlangme.enums.Notification.ON")
    void setUserAllNotificationOff(User user);

    List<Feed> findTop5ByUserIdOrderByIdDesc(Long userId);

    List<Feed> findTop5ByUserIdAndIdLessThanOrderByIdDesc(Long userId, Long id);

}
