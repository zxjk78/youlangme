package com.a603.youlangme.service;

import com.a603.youlangme.advice.exception.BoardNotFoundException;
import com.a603.youlangme.advice.exception.UserNotFoundException;
import com.a603.youlangme.dto.like.LikeUserResponseDto;
import com.a603.youlangme.entity.Board;
import com.a603.youlangme.entity.BoardImg;
import com.a603.youlangme.entity.User;
import com.a603.youlangme.dto.board.BoardDto;
import com.a603.youlangme.repository.BoardImgRepository;
import com.a603.youlangme.entity.UserBoardLike;
import com.a603.youlangme.repository.BoardRepository;
import com.a603.youlangme.repository.UserBoardLikeRepository;
import com.a603.youlangme.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional(readOnly = true) //조회 하는 부분 최적화
@RequiredArgsConstructor
public class BoardService {

    private final BoardRepository boardRepository;
    private final BoardImgRepository boardImgRepository;
    private final UserRepository userRepository;
    private final UserBoardLikeRepository userBoardLikeRepository;


    @Transactional
    public void savePost(BoardDto boardDto, Long id) throws IOException {
        User user = userRepository.findById(id).orElseThrow(UserNotFoundException::new); //한번에 예외처리 방식
        Board board = Board.builder()
                .contents(boardDto.getContents())
                .author(user)
                .build();

        boardRepository.save(board);


        // 이미지 list 저장
        String path = System.getProperty("user.dir"); // 현재 디렉토리 가져오기

        List<MultipartFile> pics = boardDto.getPics();

        for (MultipartFile pic : pics) {
            File file = new File(path + "/src/main/resources/static/" + pic.getOriginalFilename());

            // 폴더가 없다면 폴더를 생성을 해준다.
            if (!file.getParentFile().exists()) file.getParentFile().mkdirs();

            // 파일을 파일 시스템 내로 이전시킨다.
            pic.transferTo(file);
            // BoardImg DB 저장
            BoardImg img = BoardImg.builder().board(board).path(file.getName()).build();
            boardImgRepository.save(img);
        }

    }

    public void delete(Long id) {
        boardRepository.deleteById(id);
    }

    @Transactional
    public void updatePost(BoardDto boardDto, Long id) {
        Board board = boardRepository.findById(id).orElseThrow(BoardNotFoundException::new);
        board.updatePost(boardDto.getContents());
    }

    public Board read(Long id) {
        return boardRepository.findById(id).orElseThrow(BoardNotFoundException::new);
    }

    public List<BoardImg> searchBoardImgList(Board board) {
        return boardImgRepository.findAllByBoard(board);
    }

    @Transactional
    public void likeBoard(Long userId, Long boardId) {
        User user = userRepository.findById(userId).orElse(null);
        Board board = boardRepository.findById(boardId).orElse(null);
        userBoardLikeRepository.save(new UserBoardLike(user, board));
    }

    @Transactional
    public void dislikeBoard(Long userId, Long boardId) {
        User user = userRepository.findById(userId).orElse(null);
        Board board = boardRepository.findById(boardId).orElse(null);
        userBoardLikeRepository.deleteByUserAndBoard(user, board);
    }

    public List<Long> readUserBoardLike(Long userId) {
        List<UserBoardLike> userBoardLikes = userBoardLikeRepository.findAllByUserId(userId);
        List<Long> likeList = new ArrayList<>();
        for (UserBoardLike userBoardLike : userBoardLikes) {
            likeList.add(userBoardLike.getBoard().getId());
        }
        return likeList;
    }

    public List<LikeUserResponseDto> readLikeUsers(Long boardId) {
        List<UserBoardLike> userBoardLikes = userBoardLikeRepository.findAllByBoardId(boardId);
        List<LikeUserResponseDto> likeUserResponseDtoList = new ArrayList<>();
        for (UserBoardLike userBoardLike : userBoardLikes) {
            User user = userBoardLike.getUser();
            likeUserResponseDtoList.add(new LikeUserResponseDto(user.getId(), user.getName(), user.getImage()));
        }
        return likeUserResponseDtoList;
    }
}
