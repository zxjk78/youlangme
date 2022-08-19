package com.a603.youlangme.repository;

import com.a603.youlangme.entity.MatchingFeedback;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MatchingFeedbackRepository extends JpaRepository<MatchingFeedback, Long> {

}
