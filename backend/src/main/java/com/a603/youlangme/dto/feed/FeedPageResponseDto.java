package com.a603.youlangme.dto.feed;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@AllArgsConstructor
@Getter
public class FeedPageResponseDto {

    List<FeedResponseDto> feedResponseDtoList;

    Long nextId;

}
