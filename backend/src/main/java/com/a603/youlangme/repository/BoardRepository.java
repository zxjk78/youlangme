package com.a603.youlangme.repository;

import com.a603.youlangme.entity.Board;
import com.a603.youlangme.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BoardRepository extends JpaRepository<Board,Long> {


    @Query(value = "select b from Board b join fetch b.author u")
    List<Board> Boardfind(Long id);

    //Page<Board> findAllByUser(User user, Pageable pageable);
    @Query(value = "select b from Board b join b.author u ")
    Page<Board>BoardList(PageRequest pageRequest);
}
