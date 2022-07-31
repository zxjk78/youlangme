package com.a603.youlangme.repository;

import com.a603.youlangme.entity.meta.ExpActivity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ExpActivityRepository extends JpaRepository<ExpActivity, Long> {
}
