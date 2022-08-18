package com.a603.youlangme.service;

import com.a603.youlangme.advice.exception.DataNotFoundException;
import com.a603.youlangme.advice.exception.UnAllowedAccessException;
import com.a603.youlangme.advice.exception.UserNotFoundException;
import com.a603.youlangme.cache.Grass;
import com.a603.youlangme.config.logging.ExpLogging;
import com.a603.youlangme.dto.ranking.LanguageResponseDto;
import com.a603.youlangme.dto.ranking.RankLogResponseDto;
import com.a603.youlangme.dto.user.UserLevelDetailsResponseDto;
import com.a603.youlangme.dto.user.UserProfileResponseDto;
import com.a603.youlangme.dto.user.UserSetBasicInfoRequestDto;
import com.a603.youlangme.entity.*;
import com.a603.youlangme.entity.meta.Favorite;
import com.a603.youlangme.entity.log.AttendanceLog;
import com.a603.youlangme.entity.log.MeetingLog;
import com.a603.youlangme.enums.Language;
import com.a603.youlangme.enums.MeetingLogType;
import com.a603.youlangme.repository.*;
import com.a603.youlangme.repository.log.AttendanceLogRepository;
import com.a603.youlangme.repository.log.ExpLogRepository;
import com.a603.youlangme.repository.log.MeetingLogRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;

import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.text.ParseException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.time.ZoneId;
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
    private final AttendanceLogRepository attendanceLogRepository;
    private final ExpLogRepository expLogRepository;
    private final ExpActivityRepository expActivityRepository;

    private final UserExpRepository userExpRepository;

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

        // 총 미팅 시간 (분)
        int meetingTime = expLogRepository.findAllByUserAndActivity(user, expActivityRepository.getReferenceById(3L))
                .stream()
                .map(log->log.getMultiBase())
                .reduce((sum, time)->sum+time).orElse(0);
        // 총 대화 참여 횟수
        Integer meetingCnt = expLogRepository.countByUserAndActivity(user, expActivityRepository.getReferenceById(3L));
        // 게시글 개수
        Integer boardCnt = expLogRepository.countByUserAndActivity(user, expActivityRepository.getReferenceById(1L));
        // 댓글 개수
        Integer replyCnt = expLogRepository.countByUserAndActivity(user, expActivityRepository.getReferenceById(2L));
        // 총 출석 일수
        Integer attendanceCnt = expLogRepository.countByUserAndActivity(user, expActivityRepository.getReferenceById(4L));

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
        Map<Long, Integer> openLogTimeMap = new HashMap<>();

        List<MeetingLog> meetingLogs = meetingLogRepository.findAllByUserWithChatRoomLog(user);
        for (MeetingLog log : meetingLogs) {
            Language lang = log.getYourLanguage();
            int time = (int)(log.getChatRoomLog().getCreatedTime().atZone(ZoneId.systemDefault()).toInstant().toEpochMilli()/1000);
            if (log.getLogType().equals(MeetingLogType.START)) {
                openLogTimeMap.put(log.getChatRoomLog().getId(), time);
            } else {
                // end 로그 시간 - start 로그 시간을 더해준다.
                Long openLogId = log.getChatRoomLog().getOpenLogId();
                if(!openLogTimeMap.containsKey(openLogId)) continue;
                int timeToAdd = time - openLogTimeMap.get(openLogId);
                if(!langTimeMap.containsKey(lang))
                    langTimeMap.put(lang, timeToAdd);
                else langTimeMap.put(lang,  langTimeMap.get(lang)+timeToAdd);
            }
        }

        // 초 -> 분 변환
        for(Language lang : langTimeMap.keySet()) {
            langTimeMap.put(lang,langTimeMap.get(lang)/60);
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

        for(String key:map.keySet()){
            Grass grass=Grass.builder()
                    .day(key)
                    .value(map.get(key))
                    .build();
            result.add(grass);
        }
        return result;
    }


    @Transactional
    @ExpLogging
    public Long logAttendance(String email) {
        User user = userRepository.findByEmail(email).orElseThrow(UserNotFoundException::new);
        AttendanceLog lastLog = attendanceLogRepository.findTop1ByUserOrderByCreatedTimeDesc(user);

        if(lastLog!=null) {
            LocalDate lastLogDate = lastLog.getCreatedTime().toLocalDate();
            LocalDate currentDate = LocalDate.now();
            // 하루 한번 출석으로 인정
            if (lastLogDate.isEqual(currentDate)) return -1L;
        }

        attendanceLogRepository.save(AttendanceLog.of(user));

        return user.getId();
    }

    @Cacheable(value = "Language",key="{#id}",cacheManager = "cacheManager")
    public List<LanguageResponseDto>TopLanguage(Long id){

        List<MeetingLog>meetingLogList=meetingLogRepository.findAll();

        int total=meetingLogList.size();
        HashMap<String,Integer>map=new HashMap<>();

        for(MeetingLog meetingLog:meetingLogList){
            String lang=meetingLog.getYourLanguage().toString();
            map.put(lang,map.getOrDefault(lang,0)+1);
        }

        PriorityQueue<Lang>pq=new PriorityQueue<>();

        for(String lang: map.keySet()){
            pq.add(new Lang(lang,map.get(lang)));
        }

        List<LanguageResponseDto>result=new ArrayList<>();
        for(int i=0;i<3;i++){
            Lang lang=pq.poll();
            String l=lang.language;
            int p= lang.per;
            LanguageResponseDto languageResponseDto=new LanguageResponseDto();
            languageResponseDto.setLanguage(l);
            languageResponseDto.setPercent(Math.round(((double)p/total)*100.0));
            result.add(languageResponseDto);
        }
        return result;
    }

    @Cacheable(value = "RankUser",key = "{#id}",cacheManager = "cacheRankManager") //각 id에 맞는 정보
    public List<RankLogResponseDto>RankList(Long id){
        List<RankLogResponseDto>result=new ArrayList<>();

        List<UserExp>userExpList=userExpRepository.findAll();

        PriorityQueue<Rank>pq=new PriorityQueue<>();

        User user=userRepository.findById(id).orElseThrow(UserNotFoundException::new);

        Long uid=user.getId(); //마이페이지 유저


        System.out.println(userExpList.size()+" 사이즈");
        for(UserExp userExp:userExpList){
            System.out.println(userExp.getUser().getName()+" "+userExp.getExp());
            pq.add(new Rank(userExp.getUser().getId(),userExp.getUser().getName(),userExp.getExp()));
        }

        while(pq.size()<3){
            return null;
        }

        Rank rank1=pq.poll();
        Rank rank2=pq.poll();
        Rank rank3=pq.poll();

        for(int i=1;i<4;i++){
            RankLogResponseDto rankLogResponseDto=new RankLogResponseDto();
            if(i==1){
                rankLogResponseDto.setId(rank1.id);
                rankLogResponseDto.setRank(i);
                rankLogResponseDto.setLv(rank1.LV);
                rankLogResponseDto.setName(rank1.name);
            }else if(i==2){
                rankLogResponseDto.setId(rank2.id);
                rankLogResponseDto.setRank(i);
                rankLogResponseDto.setLv(rank2.LV);
                rankLogResponseDto.setName(rank2.name);
            }else{
                rankLogResponseDto.setId(rank3.id);
                rankLogResponseDto.setRank(i);
                rankLogResponseDto.setLv(rank3.LV);
                rankLogResponseDto.setName(rank3.name);
            }
            result.add(rankLogResponseDto);
        }

        if(rank1.id!=uid&&rank2.id!=uid&&rank3.id!=uid){
            int ranking=4;
            while(!pq.isEmpty()){
                Rank rank=pq.poll();
                if(rank.id==uid){
                    RankLogResponseDto rankLogResponseDto=new RankLogResponseDto().builder()
                            .id(rank.id)
                            .lv(rank.LV)
                            .name(rank.name)
                            .rank(ranking)
                            .build();
                    result.add(rankLogResponseDto);
                    return result;
                }else{
                    ranking++;
                    continue;
                }
            }
        }
        return result;
    }

    public String postTranslate(String apiUrl,Map<String,String> requestHeaders,String text,String my,String you){
        HttpURLConnection con = connect(apiUrl);
        String postParams = "source="+you+"&target="+my+"&text=" + text; //원본언어: 한국어 (ko) -> 목적언어: 영어 (en)
        try {
            con.setRequestMethod("POST");
            for(Map.Entry<String, String> header :requestHeaders.entrySet()) {
                con.setRequestProperty(header.getKey(), header.getValue());
            }

            con.setDoOutput(true);
            try (DataOutputStream wr = new DataOutputStream(con.getOutputStream())) {
                wr.write(postParams.getBytes());
                wr.flush();
            }

            int responseCode = con.getResponseCode();
            if (responseCode == HttpURLConnection.HTTP_OK) { // 정상 응답
                return readBody(con.getInputStream());
            } else {  // 에러 응답
                return readBody(con.getErrorStream());
            }
        } catch (IOException e) {
            throw new RuntimeException("API 요청과 응답 실패", e);
        } finally {
            con.disconnect();
        }
    }

    private static HttpURLConnection connect(String apiUrl){
        try {
            URL url = new URL(apiUrl);
            return (HttpURLConnection)url.openConnection();
        } catch (MalformedURLException e) {
            throw new RuntimeException("API URL이 잘못되었습니다. : " + apiUrl, e);
        } catch (IOException e) {
            throw new RuntimeException("연결이 실패했습니다. : " + apiUrl, e);
        }
    }

    private static String readBody(InputStream body){
        InputStreamReader streamReader = new InputStreamReader(body, StandardCharsets.UTF_8); //뒤에 변수 추가하니 해결

        try (BufferedReader lineReader = new BufferedReader(streamReader)) {
            StringBuilder responseBody = new StringBuilder();

            String line;
            while ((line = lineReader.readLine()) != null) {
                responseBody.append(line);
            }

            return responseBody.toString();
        } catch (IOException e) {
            throw new RuntimeException("API 응답을 읽는데 실패했습니다.", e);
        }
    }

}

class Lang implements Comparable<Lang>{
    String language;
    int per;
    Lang(String language,int per){
        this.language=language;
        this.per=per;
    }

    public int compareTo(Lang l){
        return l.per-this.per;
    }
}

class Rank implements Comparable<Rank>{

    Long id;
    String name;
    int LV;
    Rank(Long id,String name,int LV){
        this.id=id;
        this.name=name;
        this.LV=LV;
    }

    public int compareTo(Rank l){
        return l.LV-this.LV;
    }
}