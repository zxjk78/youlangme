package com.a603.youlangme.dto.reply;

import lombok.*;

import javax.persistence.Column;
import javax.persistence.Lob;
import java.time.LocalDateTime;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReplyResponseDto {

    private Long id;

    private String contents;

    private LocalDateTime createDate;

    private Long pid;

    private String userName;
}
