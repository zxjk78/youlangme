package com.a603.youlangme.repository;

import com.a603.youlangme.entity.Board;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BoardRepository extends JpaRepository<Board,Long> {
}
