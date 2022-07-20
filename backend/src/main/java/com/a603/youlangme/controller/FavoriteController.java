package com.a603.youlangme.controller;

import com.a603.youlangme.dto.favorite.FavoriteItemResponseDto;
import com.a603.youlangme.response.ManyResult;
import com.a603.youlangme.service.FavoriteService;
import com.a603.youlangme.service.ResponseService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@RequestMapping("/favorite")
public class FavoriteController {

    private final FavoriteService favoriteService;
    private final ResponseService responseService;

    @GetMapping("/list")
    public ManyResult<FavoriteItemResponseDto> getFavoriteList() {
        List<FavoriteItemResponseDto> favoriteList = favoriteService.getFavoriteList().stream()
                .map(favorite -> FavoriteItemResponseDto.builder().id(favorite.getId()).name(favorite.getName()).build())
                .collect(Collectors.toList());

        return responseService.getManyResult(favoriteList);
    }

}
