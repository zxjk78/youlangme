package com.a603.youlangme.service;

import com.a603.youlangme.advice.exception.BoardNotFoundException;
import com.a603.youlangme.advice.exception.ReplyNotFoundException;
import com.a603.youlangme.advice.exception.UserNotFoundException;
import com.a603.youlangme.entity.Board;
import com.a603.youlangme.entity.Reply;
import com.a603.youlangme.entity.User;
import com.a603.youlangme.dto.reply.ReplyDto;
import com.a603.youlangme.dto.reply.ReplyResponseDto;
import com.a603.youlangme.repository.BoardRepository;
import com.a603.youlangme.repository.ReplyRepository;
import com.a603.youlangme.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
public class ReplyService {

    @Autowired
    BoardRepository boardRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    ReplyRepository replyRepository;

    @Transactional
    public void saveReply(ReplyDto replyDto, Long boardId,Long UserId){
        Board board=boardRepository.findById(boardId).orElseThrow(BoardNotFoundException::new);

        User user=userRepository.findById(UserId).orElseThrow(UserNotFoundException::new); //댓글작성자 정보

        Reply reply= Reply.builder()
                .contents(replyDto.getContents())
                .user(user)
                .board(board)
                .pid(replyDto.getPid())
                .build();
        replyRepository.save(reply);

        Reply replynow=replyRepository.findById(reply.getId()).orElseThrow(ReplyNotFoundException::new);
        if(reply.getPid()==-1){
            replynow.initpid(reply.getId());
        }
    }

    @Transactional
    public void deleteReply(Long boardId,Long replyId){
        replyRepository.deleteById(replyId);
    }

    @Transactional
    public void updateReply(ReplyDto replyDto, Long boardId, Long replyId){
        Reply reply=replyRepository.findById(replyId).orElseThrow(ReplyNotFoundException::new);

    }

    @Transactional
    public List<ReplyResponseDto> readReply(Long boardId){
        Board board=boardRepository.findById(boardId).orElseThrow(BoardNotFoundException::new);

        List<ReplyResponseDto>replyList=replyRepository.findAllByBoardIdOrderByPidAscCreatedDateAsc(boardId)
                        .stream()
                .map(reply -> ReplyResponseDto.builder().pid(reply.getPid()).contents(reply.getContents())
                        .createDate(reply.getCreatedDate())
                        .id(reply.getId())
                        .build()).collect(Collectors.toList());

        for(ReplyResponseDto replyResponseDto:replyList){
            System.out.println(replyResponseDto.toString());
        }
        //Sort.by(Sort.Direction.ASC,"pid");

        return replyList;

    }

}
