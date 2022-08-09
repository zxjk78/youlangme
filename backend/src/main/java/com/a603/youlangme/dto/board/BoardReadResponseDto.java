package com.a603.youlangme.dto.board;

import com.a603.youlangme.entity.Board;
import com.a603.youlangme.entity.BoardImg;
import lombok.Getter;

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
        res.createdTime = board.getCreatedTime();
        res.modifiedTime = board.getModifiedTime();
        res.userId = board.getAuthor().getId();
        res.userName = board.getAuthor().getUsername();

        for(BoardImg img : boardImgList){
            res.imgList.add(img.getPath());
        }

        return res;
    }
}
