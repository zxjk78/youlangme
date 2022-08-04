package com.a603.youlangme.dto.reply;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import javax.persistence.Column;
import javax.persistence.Lob;

@Getter
@Setter
@AllArgsConstructor
public class ReplyDto {

    private String contents;

    private Long pid;


}
