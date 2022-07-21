package com.a603.youlangme.service;

import com.a603.youlangme.advice.exception.BoardNotFoundException;
import com.a603.youlangme.advice.exception.UserNotFoundException;
import com.a603.youlangme.entity.Board;
import com.a603.youlangme.entity.User;
import com.a603.youlangme.dto.board.BoardDto;
import com.a603.youlangme.repository.BoardRepository;
import com.a603.youlangme.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true) //조회 하는 부분 최적화
public class BoardService {

    @Autowired
    BoardRepository boardRepository;

    @Autowired
    UserRepository userRepository;

    @Transactional
    public void savePost(BoardDto boardDto,Long id){
        User user=userRepository.findById(id).orElseThrow(UserNotFoundException::new); //한번에 예외처리 방식
        Board board= Board.builder()
                        .contents(boardDto.getContents())
                .author(user)
                .build();
        boardRepository.save(board);
    }

    public void delete(Long id){
        boardRepository.deleteById(id);
    }

    @Transactional
    public void updatePost(BoardDto boardDto,Long id){
        Board board=boardRepository.findById(id).orElseThrow(BoardNotFoundException::new);
        board.updatePost(boardDto.getContents());
    }

    public void read(Long id){
        Board board=boardRepository.findById(id).orElseThrow(UserNotFoundException::new);
    }
}
