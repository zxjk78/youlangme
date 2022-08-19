package com.a603.youlangme.dto.follow;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@AllArgsConstructor
@Builder
public class FollowFollowerFolloweeCntResponseDto {

    private Integer followerCnt;
    private Integer followeeCnt;
}
