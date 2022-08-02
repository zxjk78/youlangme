package com.a603.youlangme.dto.user;

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
public class UserExpLevelResponseDto {
    private Integer exp;
    private Long levelId;
    private String levelName;
}
