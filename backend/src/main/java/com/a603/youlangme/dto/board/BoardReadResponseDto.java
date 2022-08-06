package com.a603.youlangme.dto.board;

import com.a603.youlangme.entity.Board;
import com.a603.youlangme.entity.BoardImg;
import com.a603.youlangme.entity.Reply;
import com.a603.youlangme.entity.User;
import com.a603.youlangme.repository.BoardImgRepository;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
public class BoardReadResponseDto {

    private String contents;

    private LocalDateTime createdTime;
    private LocalDateTime modifiedTime;

    private Long userId;
    private String userName;

    private List<String> imgList = new ArrayList<>();

    public static BoardReadResponseDto of(Board board, List<BoardImg> boardImgList) {
        BoardReadResponseDto res = new BoardReadResponseDto();
        res.contents = board.getContents();
        res.createdTime = board.getCreatedDate();
        res.modifiedTime = board.getModifiedDate();
        res.userId = board.getAuthor().getId();
        res.userName = board.getAuthor().getName();

        for(BoardImg img : boardImgList){
            res.imgList.add(img.getPath());
        }

        return res;
    }
}
