package com.a603.youlangme.dto.board;


import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.Lob;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class BoardDto {

    @Lob
    private String contents;


}
