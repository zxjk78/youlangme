package com.a603.youlangme.repository;

import com.a603.youlangme.entity.User;
import com.a603.youlangme.entity.UserExp;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserExpRepository extends JpaRepository<UserExp, Long> {

    Optional<UserExp> findByUser(User user);
}
