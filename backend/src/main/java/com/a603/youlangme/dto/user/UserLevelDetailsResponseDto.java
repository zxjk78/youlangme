package com.a603.youlangme.dto.user;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserLevelDetailsResponseDto {
    private Integer meetingTime;
    private Integer meetingCnt;
    private Integer boardCnt;
    private Integer replyCnt;
    private Integer attendanceCnt;
}
