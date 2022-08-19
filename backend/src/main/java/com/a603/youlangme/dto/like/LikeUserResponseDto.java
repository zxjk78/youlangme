package com.a603.youlangme.dto.like;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class LikeUserResponseDto {
    Long  Id;
    String name;
    String image;
}
