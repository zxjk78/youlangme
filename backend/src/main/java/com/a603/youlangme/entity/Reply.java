package com.a603.youlangme.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
public class Reply extends BaseEntity {

    @Column(length=2000)
    private String contents;

    @JoinColumn(name="board_id")
    @ManyToOne(fetch = FetchType.LAZY)
    private Board board;

    @JoinColumn(name="user_id")
    @ManyToOne(fetch = FetchType.LAZY)
    private User user;

    private Long pid;

    public static Reply of(String contents, Board board, User user,Long pid) {
        Reply reply = new Reply();
        reply.contents=contents;
        reply.board=board;
        reply.user=user;
        reply.pid=pid;
        return reply;
    }



    @Builder
    public Reply(String contents, User user, Board board, Long pid){
        this.contents=contents;
        this.user=user;
        this.board=board;
        this.pid=pid;
    }

    public void initpid(Long pid){
        this.pid=pid;
    }
}
