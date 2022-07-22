package com.a603.youlangme.repository;

import com.a603.youlangme.entity.UserBadge;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserBadgeRepository extends JpaRepository<UserBadge, Long> {
    void deleteByUserId(Long userId);
}
