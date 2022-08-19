package com.a603.youlangme.repository;

import com.a603.youlangme.entity.Board;
import com.a603.youlangme.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BoardRepository extends JpaRepository<Board,Long> {


    @Query(value = "select b from Board b join fetch b.author u")
    List<Board> Boardfind(Long id);

    //Page<Board> findAllByUser(User user, Pageable pageable);
    @Query(value = "select b from Board b join b.author u ")
    Page<Board>BoardList(PageRequest pageRequest);

    @Query("select b from Board b where b.author.id = :authorId order by b.id desc")
    List<Board> findAllByAuthorIdOrderByIdDesc1(@Param("authorId") Long authorId, Pageable pageable);
    @Query("select b from Board b where b.author.id = :authorId and b.id < :boardId order by b.id desc")
    List<Board> findAllByAuthorIdOrderByIdDesc2(@Param("authorId") Long authorId, @Param("boardId") Long id, Pageable pageable);

    @Query("select b from Board b where b.author.id in (select f.followee.id from Follow f where f.follower.id = :userId) order by b.id desc")
    List<Board> findAllByFolloweeIdOrderByIdDesc1(@Param("userId") Long authorId, Pageable pageable);
    @Query("select b from Board b where b.author.id in (select f.followee.id from Follow f where f.follower.id = :userId ) and b.id < :boardId  order by b.id desc")
    List<Board> findAllByFolloweeIdOrderByIdDesc2(@Param("userId") Long userId, @Param("boardId") Long id, Pageable pageable);

    Integer countByAuthor(User author);

    Board findBoardById(Long id);
}
