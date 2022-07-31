package com.a603.youlangme.service;

import com.a603.youlangme.advice.exception.BoardNotFoundException;
import com.a603.youlangme.advice.exception.UserNotFoundException;
import com.a603.youlangme.config.logging.ExpLogging;
import com.a603.youlangme.config.logging.Logging;
import com.a603.youlangme.dto.board.BoardPagingDto;
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
import com.a603.youlangme.util.SHA256;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.security.NoSuchAlgorithmException;
import java.time.LocalDateTime;
import java.util.List;

import java.util.ArrayList;
import java.util.List;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true) //조회 하는 부분 최적화
@RequiredArgsConstructor
public class BoardService {

    private final BoardRepository boardRepository;
    private final BoardImgRepository boardImgRepository;
    private final UserRepository userRepository;
    private final UserBoardLikeRepository userBoardLikeRepository;

    @Value("${image.board.path}")
    private String BOARD_IMG_PATH;

    // String 해시화 메서드
    public String getFileNameHash(String fileName){
        String hash = null;
        try {
            hash = SHA256.encrypt(LocalDateTime.now().toString());
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException(e);
        }
        return hash;
    }

    // 게시글 이미지 파일들 저장(서버저장, DB에 경로 저장) 처리 메서드
    public void savePics(Board board, List<MultipartFile> pics) throws IOException{
        if(pics==null) return;

        String path = System.getProperty("user.dir"); // 현재 디렉토리 가져오기

        for (MultipartFile pic : pics) {
            String hashedFileName = getFileNameHash(pic.getOriginalFilename());
            String saveFileName = hashedFileName+"_"+pic.getOriginalFilename();
            File file = new File(path + BOARD_IMG_PATH + saveFileName);

            // 폴더가 없다면 폴더를 생성을 해준다.
            if (!file.getParentFile().exists()) file.getParentFile().mkdirs();

            // 파일을 파일 시스템 내로 이전시킨다.
            pic.transferTo(file);
            // BoardImg DB 저장
            BoardImg img = BoardImg.builder().board(board).path(saveFileName).build();
            boardImgRepository.save(img);
        }
    }

    @Logging
    @ExpLogging
    @Transactional
    public Long savePost(BoardDto boardDto, Long id) throws IOException {
        User user = userRepository.findById(id).orElseThrow(UserNotFoundException::new); //한번에 예외처리 방식
        Board board = Board.builder()
                .contents(boardDto.getContents())
                .author(user)
                .build();

        Board res = boardRepository.save(board);

        // 이미지 list 저장
        String path = System.getProperty("user.dir"); // 현재 디렉토리 가져오기

        List<MultipartFile> pics = boardDto.getPics();
        savePics(board, pics);

        return res.getId();
    }

    @Transactional
    public void delete(Board board) throws IOException  {
        // 이미지 파일 삭제
        List<BoardImg> picsToDelete = boardImgRepository.findAllByBoard(board);

        String path = System.getProperty("user.dir"); // 현재 디렉토리 가져오기

        for (BoardImg pic : picsToDelete) {
            File file = new File(path + BOARD_IMG_PATH + pic.getPath());
            // 파일을 파일 시스템에서 삭제
            file.delete();
            // DB에서도 삭제
            boardImgRepository.delete(pic);
        }

        boardRepository.delete(board);
    }

    @Transactional
    public void updatePost(BoardDto boardDto, Long id)  throws IOException {
        Board board = boardRepository.findById(id).orElseThrow(BoardNotFoundException::new);

        // 이미지 수정
        String path = System.getProperty("user.dir"); // 현재 디렉토리 가져오기

        // 1. 기존 이미지 삭제
        List<BoardImg> picsToDelete = boardImgRepository.findAllByBoard(board);
        for (BoardImg pic : picsToDelete) {
            File file = new File(path + BOARD_IMG_PATH + pic.getPath());

            // 파일을 파일 시스템에서 삭제
            file.delete();
            // DB에서도 삭제
            boardImgRepository.delete(pic);
        }

        // 2. 새 이미지 등록
        List<MultipartFile> pics = boardDto.getPics();
        savePics(board,pics);

        board.updatePost(boardDto.getContents());
    }

    public Board read(Long id){
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

    public List<BoardPagingDto>BoardInit(User user){
        List<BoardPagingDto>boardList=boardRepository.Boardfind(user.getId()).stream()
                .map(board -> BoardPagingDto.builder()
                        .contents(board.getContents())
                        .name(user.getName())
                        .createdTime(board.getCreatedDate())
                        .build()).collect(Collectors.toList());
        return boardList;
    }

    public Page<BoardPagingDto>boardPaging(User user,Pageable pageable,Long click) {
//        Page<BoardPagingDto> boards = boardRepository.BoardList(PageRequest.of(0, 5)).stream()
//                .map(board -> BoardPagingDto.builder()
//                        .contents(board.getContents())
//                        .name(user.getName()).
//                        createdTime(board.getCreatedDate())
//                        .build()).collect(Collectors.toList());
        Page<Board> boardList = boardRepository.BoardList(PageRequest.of(0, (int)(5L*click+1)));
        Page<BoardPagingDto> boards = boardList.map(new Function<Board, BoardPagingDto>() {
            @Override
            public BoardPagingDto apply(Board board) {
                BoardPagingDto boardPagingDto = new BoardPagingDto(board.getContents(), user.getName(), board.getCreatedDate());
                return boardPagingDto;
            }
        });

        return boards;
    }
}
