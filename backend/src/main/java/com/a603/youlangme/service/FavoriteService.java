package com.a603.youlangme.service;

import com.a603.youlangme.entity.Favorite;
import com.a603.youlangme.repository.FavoriteRepository;
import com.a603.youlangme.repository.UserFavoriteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class FavoriteService {

    private final FavoriteRepository favoriteRepository;
    private final UserFavoriteRepository userFavoriteRepository;

    public List<Favorite> getFavoriteList() {
        return favoriteRepository.findAll();
    }
}
