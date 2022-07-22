package com.a603.youlangme.service;

import com.a603.youlangme.advice.exception.DataNotFoundException;
import com.a603.youlangme.advice.exception.UnAllowedAccessException;
import com.a603.youlangme.dto.badge.BadgeResponseDto;
import com.a603.youlangme.dto.user.UserProfileResponseDto;
import com.a603.youlangme.dto.user.UserSetBasicInfoRequestDto;
import com.a603.youlangme.entity.Favorite;
import com.a603.youlangme.entity.User;
import com.a603.youlangme.entity.UserBadge;
import com.a603.youlangme.entity.UserFavorite;
import com.a603.youlangme.enums.Achievement;
import com.a603.youlangme.enums.Language;
import com.a603.youlangme.enums.Nationality;
import com.a603.youlangme.repository.FavoriteRepository;
import com.a603.youlangme.repository.UserFavoriteRepository;
import com.a603.youlangme.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.io.IOUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;

import java.util.List;

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
        List<Long> favoriteIdList =  basicInfo.getFavoriteList();

        User user = userRepository.findById(userId).orElse(null);
        if (user == null) return;

        user.updateBasicInfo(name, myLanguage, yourLanguage, nationality);

        // userFavorite 수정
        user.getUserFavorites().clear();
        userFavoriteRepository.deleteByUserId(user.getId());

        if(basicInfo.getFavoriteList().isEmpty() || basicInfo.getFavoriteList().size()>3) throw new UnAllowedAccessException();
        for (Long favoriteId : favoriteIdList) {
            Favorite favorite = favoriteRepository.findById(favoriteId).orElseThrow(DataNotFoundException::new);
            UserFavorite userFavorite = UserFavorite.builder().user(user).favorite(favorite).build();
            user.getUserFavorites().add(userFavorite);
        }
    }

    // Profile Start

    @Transactional
    public void updateUserDescription(Long userId, String desc) {
        User user = userRepository.findById(userId).orElse(null);
        user.updateDescription(desc);
    }

    @Transactional
    public void updateUserImage(Long userId, MultipartFile file) throws IOException {
        User user = userRepository.findById(userId).orElse(null);

        String path = System.getProperty("user.dir");
        String fileName = user.getId() + ".jpg";
        File f = new File(path + "src/main/resources/static/" + fileName);
        if(f.exists()) {
        //    f.delete();
        }
        user.updateImage(path + fileName);
    }

    public byte[] findUserImage(Long userId) throws IOException {
        User user = userRepository.findById(userId).orElse(null);
        InputStream imageStream = new FileInputStream(user.getImage());
        byte[] imageByteArray = IOUtils.toByteArray(imageStream);
        imageStream.close();
        return imageByteArray;
    }

    public UserProfileResponseDto findUserProfile(Long userId) throws IOException {
        User user = userRepository.findById(userId).orElse(null);
        UserProfileResponseDto userProfileResponseDto = new UserProfileResponseDto();
        userProfileResponseDto.setName(user.getName());
        userProfileResponseDto.setDescription(user.getDescription());
        userProfileResponseDto.setUserImage(user.getImage());
        userProfileResponseDto.setExp(user.getExp());

        for (UserFavorite userFavorite : user.getUserFavorites()) {
            userProfileResponseDto.favorites.add(userFavorite.getFavorite().getName());
        }

        for (UserBadge userBadge : user.getUserBadges()) {
            BadgeResponseDto badgeDto = userBadge.getBadge().getBadgeDto();
            badgeDto.setAchievement(userBadge.getAchievement());
            userProfileResponseDto.badgeResponseDtos.add(badgeDto);
        }
        return userProfileResponseDto;
    }


    // Profile end
}
