package com.a603.youlangme.repository;

import com.a603.youlangme.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    List<User> findByName(String name);
    Optional<User> findByEmail(String email);
}
