package com.a603.youlangme.entity;

import lombok.Getter;

import javax.persistence.*;

@Entity
@Getter
public class Reply extends BaseEntity {

    @Lob
    private String contents;

    @JoinColumn(name="board_id")
    @ManyToOne(fetch = FetchType.LAZY)
    private Board board;

    @JoinColumn(name="reply_id")
    @ManyToOne(fetch = FetchType.LAZY)
    private User user;

    public static Reply of(String contents, Board board, User user) {
        Reply reply = new Reply();
        reply.contents=contents;
        reply.board=board;
        reply.user=user;
        return reply;
    }
}
