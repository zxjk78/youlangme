package com.a603.youlangme.repository;

import com.a603.youlangme.entity.Board;
import com.a603.youlangme.entity.BoardImg;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BoardImgRepository extends JpaRepository<BoardImg, Long> {

    List<BoardImg> findAllByBoard(Board board);
}
