package com.a603.youlangme.service;

import com.a603.youlangme.advice.exception.DataNotFoundException;
import com.a603.youlangme.advice.exception.UnAllowedAccessException;
import com.a603.youlangme.dto.badge.BadgeRequestDto;
import com.a603.youlangme.dto.badge.BadgeResponseDto;
import com.a603.youlangme.dto.user.UserProfileResponseDto;
import com.a603.youlangme.dto.user.UserSetBasicInfoRequestDto;
import com.a603.youlangme.entity.*;
import com.a603.youlangme.entity.Favorite;
import com.a603.youlangme.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Slf4j
public class UserService {

    private final UserRepository userRepository;
    private final FavoriteRepository favoriteRepository;
    private final FollowRepository followRepository;
    private final UserFavoriteRepository userFavoriteRepository;
    private final UserBadgeRepository userBadgeRepository;
    private final BadgeRepository badgeRepository;

    public User findUserById(Long id) {
        return userRepository.findById(id).orElse(null);
    }

    public User findUserByEmail(String email) {
        return userRepository.findByEmail(email).orElse(null);
    }

    public User findUserByName(String name) {
        return userRepository.findByName(name).orElse(null);
    }

    @Value("${image.profile.path}")
    private String profilePath;


    @Transactional
    public void updateBasicInfo(Long userId, UserSetBasicInfoRequestDto basicInfo) {

        List<Long> favoriteIdList =  basicInfo.getFavoriteList();

        User user = userRepository.findById(userId).orElse(null);
        if (user == null) return;

        user.updateBasicInfo(basicInfo);

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

    public String readUserDescription(Long userId) {
        User user = userRepository.findById(userId).orElse(null);
        return user.getDescription();
    }

    @Transactional
    public String updateUserDescription(Long userId, String description) {
        User user = userRepository.findById(userId).orElse(null);
        user.updateDescription(description);
        return description;
    }

    public String readUserImage(Long userId) {
        User user = userRepository.findById(userId).orElse(null);
        return user.getImage();
    }

    @Transactional
    public String updateUserImage(Long userId, MultipartFile file) throws IOException {
        User user = userRepository.findById(userId).orElse(null);

        String path = System.getProperty("user.dir");
        String fileName = user.getId() + ".jpg";
        File f = new File(path + profilePath + fileName);
        if(!f.getParentFile().exists())
            f.getParentFile().mkdir();
        file.transferTo(f);
        user.updateImage(path + profilePath + fileName);
        return path + profilePath + fileName;
    }

    public UserProfileResponseDto readUserProfile(Long userId) {
        User user = userRepository.findById(userId).orElse(null);
        UserProfileResponseDto userProfileResponseDto = new UserProfileResponseDto();
        // 이거 나중에 user entity에서 dto로 한번에 바꿀예정
        userProfileResponseDto.setName(user.getName());
        userProfileResponseDto.setYourlanguage(user.getYourlanguage());
        userProfileResponseDto.setMylanguage(user.getMylanguage());
        userProfileResponseDto.setGender(user.getGender());
        userProfileResponseDto.setNationality(user.getNationality());
        userProfileResponseDto.setBirthDay(user.getBirthDay());

        for (UserFavorite userFavorite : user.getUserFavorites()) {
            userProfileResponseDto.favorites.add(userFavorite.getFavorite().getId());
        }
        return userProfileResponseDto;
    }

    public List<BadgeResponseDto> readBadgeList(Long userId) {
        User user = userRepository.findById(userId).orElse(null);
        List<BadgeResponseDto> badgeResponseDtoList = new ArrayList<>();
        for (UserBadge userBadge : user.getUserBadges()) {
            Badge badge = userBadge.getBadge();
            BadgeResponseDto badgeResponseDto = BadgeResponseDto.builder()
                    .id(badge.getId())
                    .name(badge.getName())
                    .description(badge.getDescription())
                    .build();
            badgeResponseDto.setBadgeSelect(userBadge.getBadgeSelect());
            badgeResponseDtoList.add(badgeResponseDto);
        }
        return badgeResponseDtoList;
    }

    @Transactional
    public void updateBadgeList(Long userId, List<BadgeRequestDto> badgeRequestDtoList) {
        User user = userRepository.findById(userId).orElse(null);
        userBadgeRepository.deleteByUserId(user.getId());
        List<UserBadge> userBadgeList = user.getUserBadges();
        userBadgeList.clear();
        for (BadgeRequestDto badgeRequestDto : badgeRequestDtoList) {
            userBadgeRepository.save(new UserBadge(user, badgeRepository.findById(badgeRequestDto.getId()).orElse(null), badgeRequestDto.getBadgeSelect()));
        }

    }

    // Profile end
}
