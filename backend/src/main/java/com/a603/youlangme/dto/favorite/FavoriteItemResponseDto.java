package com.a603.youlangme.dto.favorite;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@AllArgsConstructor
@Builder
public class FavoriteItemResponseDto {

    private Long id;
    private String name;

}
