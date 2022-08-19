package com.a603.youlangme.dto.follow;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FollowRecommendResponseDto {
    private Long userId;
    private String userName;

}
