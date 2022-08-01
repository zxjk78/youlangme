package com.a603.youlangme.dto.board;

import com.a603.youlangme.entity.User;
import lombok.*;

import javax.persistence.Lob;
import java.time.LocalDateTime;
import java.util.ArrayList;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BoardPagingDto {
    private Long boardId;
    private String contents;
    private Long userId;
    private String userName;
    private int likeCnt;
    private int replyCnt;
    private LocalDateTime createdTime;


    //List<BoadrImg>boadrImgList=new ArrayList<>();

   // private Long replyCount; //댓글 개수


}
