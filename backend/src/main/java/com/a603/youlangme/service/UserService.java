package com.a603.youlangme.service;

import com.a603.youlangme.advice.exception.DataNotFoundException;
import com.a603.youlangme.advice.exception.UnAllowedAccessException;
import com.a603.youlangme.advice.exception.UserNotFoundException;
import com.a603.youlangme.cache.Grass;
import com.a603.youlangme.dto.user.UserLevelDetailsResponseDto;
import com.a603.youlangme.dto.grass.GrassResponseDto;
import com.a603.youlangme.dto.user.UserProfileResponseDto;
import com.a603.youlangme.dto.user.UserSetBasicInfoRequestDto;
import com.a603.youlangme.entity.*;
import com.a603.youlangme.entity.Favorite;
import com.a603.youlangme.entity.log.MeetingLog;
import com.a603.youlangme.enums.Language;
import com.a603.youlangme.enums.MeetingLogType;
import com.a603.youlangme.entity.log.MeetingLog;
import com.a603.youlangme.enums.MeetingLogType;
import com.a603.youlangme.repository.*;
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
import java.text.SimpleDateFormat;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Slf4j
public class UserService {

    private final UserRepository userRepository;
    private final FavoriteRepository favoriteRepository;
    private final FollowRepository followRepository;
    private final UserFavoriteRepository userFavoriteRepository;
    private final BoardRepository boardRepository;
    private final ReplyRepository replyRepository;
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

        List<Long> favoriteIdList = basicInfo.getFavoriteList();

        User user = userRepository.findById(userId).orElse(null);
        if (user == null) return;

        user.updateBasicInfo(basicInfo);

        // userFavorite 수정
        user.getUserFavorites().clear();
        userFavoriteRepository.deleteByUserId(user.getId());

        if (basicInfo.getFavoriteList().isEmpty() || basicInfo.getFavoriteList().size() > 3)
            throw new UnAllowedAccessException();
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
        if (!f.getParentFile().exists())
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

    // Profile end

    public User findByUserAll(Long id) {
        return userRepository.findById(id).orElse(null);
    }

    public UserLevelDetailsResponseDto readUserLevelDetails(Long id) {

        User user = userRepository.findById(id).orElseThrow(UserNotFoundException::new);

        // 총 미팅 시간(초)
        int meetingTime = 0;

        // dateTime을 milliseconds로 바꿔 차이를 계산
        Map<String, Integer> startLog = new HashMap<>();
        List<MeetingLog> meetingLogs = meetingLogRepository.findAllByUserWithChatRoomLog(user);
        for (MeetingLog log : meetingLogs) {
            String sessionId = log.getChatRoomLog().getSessionId();
            int time = (int)(log.getChatRoomLog().getCreatedTime().atZone(ZoneId.systemDefault()).toInstant().toEpochMilli()/1000);
            if (log.getLogType().equals(MeetingLogType.START)) {
                startLog.put(sessionId, time);
            } else {
                // end 로그 시간 - start 로그 시간을 더해준다.
                if (!startLog.containsKey(sessionId)) continue;
                meetingTime += time - startLog.get(sessionId);
                startLog.remove(sessionId);
            }
        }

        // 총 대화 참여 횟수
        Integer meetingCnt = meetingLogRepository.countByUser(user) / 2;

        // 게시글 개수
        Integer boardCnt = boardRepository.countByAuthor(user);

        // 댓글 개수
        Integer replyCnt = replyRepository.countByUser(user);

        // 총 출석 일수
        Integer attendanceCnt = 0;

        UserLevelDetailsResponseDto res = UserLevelDetailsResponseDto.builder().
                meetingTime(meetingTime).
                meetingCnt(meetingCnt).
                boardCnt(boardCnt).
                replyCnt(replyCnt).
                attendanceCnt(attendanceCnt).
                build();

        return res;
    }

    public Map<Language, Integer> readUserLanguageStat(Long id) {


        User user = userRepository.findById(id).orElseThrow(UserNotFoundException::new);

        Map<Language, Integer> langTimeMap = new HashMap<>();

        // dateTime을 milliseconds로 바꿔 차이를 계산
        Map<String, Integer> startLog = new HashMap<>();

        List<MeetingLog> meetingLogs = meetingLogRepository.findAllByUserWithChatRoomLog(user);
        for (MeetingLog log : meetingLogs) {
            String sessionId = log.getChatRoomLog().getSessionId();
            Language lang = log.getYourLanguage();
            int time = (int)(log.getChatRoomLog().getCreatedTime().atZone(ZoneId.systemDefault()).toInstant().toEpochMilli()/1000);
            if (log.getLogType().equals(MeetingLogType.START)) {
                startLog.put(sessionId, time);
            } else {
                // end 로그 시간 - start 로그 시간을 더해준다.
                if(!startLog.containsKey(sessionId)) continue;
                int timeToAdd = time - startLog.get(sessionId);
                if(!langTimeMap.containsKey(lang))
                    langTimeMap.put(lang, timeToAdd);
                else langTimeMap.put(lang,  langTimeMap.get(lang)+timeToAdd);

                startLog.remove(sessionId);
            }
        }

        return langTimeMap;
    }


    // set grass
    @Cacheable(value = "Grass",key = "{#id}",cacheManager = "cacheGrassManager")
    public  List<Grass>setGrassList(Long id) throws ParseException {
        List<Grass>result=new ArrayList<>();
        TreeMap<String,Integer>map=new TreeMap<>();
        List<Board>boardList=userRepository.findBoard(id);

        for(Board board:boardList){
            String parsedLocalDateTimeNow = board.getCreatedTime().format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));
            map.put(parsedLocalDateTimeNow,map.getOrDefault(parsedLocalDateTimeNow,0)+10);
        }
        List<Reply>replyList=userRepository.findReply(id);

        for(Reply reply:replyList){
            String parsedLocalDateTimeNow = reply.getCreatedTime().format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));
            map.put(parsedLocalDateTimeNow,map.getOrDefault(parsedLocalDateTimeNow,0)+1);
        }

        List<MeetingLog>meetingLogList=userRepository.findMeeting(id, MeetingLogType.END);
        for(MeetingLog meetingLog:meetingLogList){
            String parsedLocalDateTimeNow = meetingLog.getCreatedTime().format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));
            map.put(parsedLocalDateTimeNow,map.getOrDefault(parsedLocalDateTimeNow,0)+50);
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