package com.a603.youlangme.dto.follow;

import com.a603.youlangme.enums.Nationality;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@AllArgsConstructor
@Builder
public class FollowFollowerResponseDto {

    private Long id;
    private Long followerId;
    private String name;
    private Nationality nationality;
    private String image;
}
