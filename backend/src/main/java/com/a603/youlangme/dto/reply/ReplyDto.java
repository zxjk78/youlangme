package com.a603.youlangme.dto.reply;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.Lob;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class ReplyDto {


    @Lob
    private String contents;

    private Long pid;


}
