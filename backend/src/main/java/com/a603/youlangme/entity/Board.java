package com.a603.youlangme.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor
public class Board extends BaseEntity {

    @Lob
    private String contents;

    @JoinColumn(name="author_id")
    @ManyToOne(fetch= FetchType.LAZY)
    private User author;

    @OneToMany(mappedBy = "board", cascade = CascadeType.ALL)
    private List<Reply> replyList = new ArrayList<>();

    //엔티티 용
    public static Board of(String contents, User author) {
        Board board = new Board();
        board.contents = contents;
        board.author = author;
        return board;
    }

    @Builder
    public Board(String contents,User author){
        this.contents=contents;
        this.author=author;
    }

    public void updatePost(String contents){
        this.contents=contents;
    }

}
