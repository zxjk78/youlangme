package com.a603.youlangme.service;

import com.a603.youlangme.advice.exception.DataNotFoundException;
import com.a603.youlangme.advice.exception.UnAllowedAccessException;
import com.a603.youlangme.dto.user.UserSetBasicInfoRequestDto;
import com.a603.youlangme.entity.Favorite;
import com.a603.youlangme.entity.User;
import com.a603.youlangme.entity.UserFavorite;
import com.a603.youlangme.enums.Language;
import com.a603.youlangme.enums.Nationality;
import com.a603.youlangme.repository.FavoriteRepository;
import com.a603.youlangme.repository.UserFavoriteRepository;
import com.a603.youlangme.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Slf4j
public class UserService {

    private final UserRepository userRepository;
    private final FavoriteRepository favoriteRepository;
    private final UserFavoriteRepository userFavoriteRepository;

    public User findUserById(Long id) {
        return userRepository.findById(id).orElse(null);
    }

    public User findUserByEmail(String email) {
        return userRepository.findByEmail(email).orElse(null);
    }

    public User findUserByName(String name) {
        return userRepository.findByName(name).orElse(null);
    }

    @Transactional
    public void updateBasicInfo(Long userId, UserSetBasicInfoRequestDto basicInfo) {
        String name = basicInfo.getName();
        Language myLanguage = basicInfo.getMyLanguage();
        Language yourLanguage = basicInfo.getYourLanguage();
        Nationality nationality = basicInfo.getNationality();

        User user = userRepository.findById(userId).orElse(null);
        if (user == null) return;

        user.setName(name);
        user.setMylanguage(myLanguage);
        user.setYourlanguage(yourLanguage);
        user.setNationality(nationality);

        user.getUserFavorites().clear();
        userFavoriteRepository.deleteByUserId(user.getId());

        if(basicInfo.getFavoriteList().isEmpty() || basicInfo.getFavoriteList().size()>3) throw new UnAllowedAccessException();
        for (Long favoriteId : basicInfo.getFavoriteList()) {
            Favorite favorite = favoriteRepository.findById(favoriteId).orElseThrow(DataNotFoundException::new);
            UserFavorite userFavorite = UserFavorite.builder().user(user).favorite(favorite).build();
            user.getUserFavorites().add(userFavorite);
        }


    }
}
