package com.a603.youlangme.repository;

import com.a603.youlangme.entity.UserFavorite;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserFavoriteRepository extends JpaRepository<UserFavorite, Long> {

    void deleteByUserId(Long userId);
}
