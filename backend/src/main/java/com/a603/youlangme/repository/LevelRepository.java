package com.a603.youlangme.repository;

import com.a603.youlangme.entity.meta.Level;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LevelRepository extends JpaRepository<Level, Long> {
    Level findByMinExpLessThanEqualAndMaxExpGreaterThanEqual(Integer exp1, Integer exp2);
}
