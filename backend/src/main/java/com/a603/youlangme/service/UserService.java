package com.a603.youlangme.service;

import com.a603.youlangme.advice.exception.DataNotFoundException;
import com.a603.youlangme.advice.exception.UnAllowedAccessException;
import com.a603.youlangme.cache.Grass;
import com.a603.youlangme.cache.GrassRepository;
import com.a603.youlangme.dto.badge.BadgeRequestDto;
import com.a603.youlangme.dto.badge.BadgeResponseDto;
import com.a603.youlangme.dto.grass.GrassResponseDto;
import com.a603.youlangme.dto.user.UserProfileResponseDto;
import com.a603.youlangme.dto.user.UserSetBasicInfoRequestDto;
import com.a603.youlangme.entity.*;
import com.a603.youlangme.entity.Favorite;
import com.a603.youlangme.entity.log.MeetingLog;
import com.a603.youlangme.repository.*;
import com.nimbusds.oauth2.sdk.util.date.SimpleDate;
import com.querydsl.core.types.ConstantImpl;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.core.types.dsl.StringTemplate;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.sun.imageio.plugins.common.SingleTileRenderedImage;
import io.swagger.models.auth.In;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.time.DateUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.CacheManager;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.EntityManager;
import java.io.*;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

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

    private final ReplyRepository replyRepository;

    private final GrassRepository grassRepository;

    private final MeetingLogRepository meetingLogRepository;


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

    public User findByUserAll(Long id) {
        return userRepository.findById(id).orElse(null);
    }


    // set grass
    @Cacheable(value = "Grass",key = "{#id}",cacheManager = "cacheGrassManager")
    public  List<Grass>setGrassList(Long id) throws ParseException {
        List<Grass>result=new ArrayList<>();
        TreeMap<String,Integer>map=new TreeMap<>();
        List<Board>boardList=userRepository.countBoard(id);

        for(Board board:boardList){
            String parsedLocalDateTimeNow = board.getCreatedTime().format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));
            map.put(parsedLocalDateTimeNow,map.getOrDefault(parsedLocalDateTimeNow,0)+10);
        }
        List<Reply>replyList=userRepository.countReply(id);

        for(Reply reply:replyList){
            String parsedLocalDateTimeNow = reply.getCreatedTime().format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));
            map.put(parsedLocalDateTimeNow,map.getOrDefault(parsedLocalDateTimeNow,0)+1);
        }

//        for(String key:map.keySet()){
//            GrassResponseDto grassResponseDto=GrassResponseDto.builder()
//                    .day(key)
//                    .value(map.get(key))
//                    .build();
//            result.add(grassResponseDto);
//        }

        for(String key:map.keySet()){
            Grass grass=Grass.builder()
                    .day(key)
                    .value(map.get(key))
                    .build();
            result.add(grass);
        }
        return result;
    }


}