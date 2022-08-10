package com.a603.youlangme.service;

import com.a603.youlangme.advice.exception.SessionNotFoundException;
import com.a603.youlangme.advice.exception.UnAllowedAccessException;
import com.a603.youlangme.advice.exception.UserLogNotFoundException;
import com.a603.youlangme.cache.MeetingSession;
import com.a603.youlangme.cache.MeetingSessionRepository;
import com.a603.youlangme.cache.SessionEntry;
import com.a603.youlangme.cache.SessionEntryRepository;
import com.a603.youlangme.entity.User;
import com.a603.youlangme.entity.log.ChatRoomLog;
import com.a603.youlangme.entity.log.MeetingLog;
import com.a603.youlangme.enums.ChatRoomLogType;
import com.a603.youlangme.enums.Language;
import com.a603.youlangme.enums.MeetingLogType;
import com.a603.youlangme.repository.ChatRoomLogRepository;
import com.a603.youlangme.repository.MeetingLogRepository;
import com.a603.youlangme.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional // 별도의 조회 로직이 없다.
public class MeetingService {

    private final SessionEntryRepository sessionEntryRepository;
    private final MeetingSessionRepository meetingSessionRepository;

    private final UserRepository userRepository;

    private final ChatRoomLogRepository chatRoomLogRepository;
    private final MeetingLogRepository meetingLogRepository;

    // 미팅 입장 시 로직
    public void enterMeeting(String sessionId, Long userId, Language yourLanguage) {
        // Redis 캐싱을 통해 인자로 받은 sessionId를 키값으로 한 데이터에 입장한 사람들을 저장
        // -> 유지 기간 1분
        SessionEntry sessionEntry = sessionEntryRepository.findById(sessionId).orElse(null);

        // 첫번째 입장이라면 엔트리를 캐싱
        if(sessionEntry==null) {
            SessionEntry newSessionEntry = SessionEntry.builder().
                    sessionId(sessionId).
                    firstEnteredUserId(userId).
                    firstUserYourLanguage(yourLanguage).
                    build();
            sessionEntryRepository.save(newSessionEntry);
        }
        // 입장한 사람이 2명이면 startMeeting()을 수행
        else {
            // 동일한 사람이 두번 입장 방지
            if(sessionEntry.getFirstEnteredUserId().equals(userId)) throw new UnAllowedAccessException();

            // 엔트리를 캐시에서 삭제
            sessionEntryRepository.delete(sessionEntry);
            // 미팅 시작 로직 수행
            startMeeting(sessionId,
                    sessionEntry.getFirstEnteredUserId(),
                    userId,
                    sessionEntry.getFirstUserYourLanguage(),
                    yourLanguage);
        }
    }

    // 미팅 시작 시 로직
    public void startMeeting(String sessionId, Long userId1, Long userId2, Language yourLanguage1, Language yourLanguage2) {
        
        // 이미 존재하는 세션이라면 오류
        meetingSessionRepository.findById("MeetingSession:"+sessionId).orElseThrow(UnAllowedAccessException::new);
        
        // redis에 Meeting:sessionId에 유저 리스트를 다시 저장 (유지기간 24시간)
        MeetingSession newMeetingSession = MeetingSession.builder()
                .sessionId(sessionId)
                .userId1(userId1)
                .yourLanguage1(yourLanguage1)
                .userId2(userId2)
                .yourLanguage2(yourLanguage2)
                .build();

        meetingSessionRepository.save(newMeetingSession);

        // 챗룸 로그를 생성 (OPEN)
        ChatRoomLog chatRoomLog = ChatRoomLog.builder()
                .sessionId(sessionId)
                .logType(ChatRoomLogType.OPEN)
                .build();

        chatRoomLogRepository.save(chatRoomLog);

        // 미팅 로그를 생성1 (START)
        User user1 = userRepository.findById(userId1).orElseThrow(UserLogNotFoundException::new);
        MeetingLog meetingLog1 = MeetingLog.builder()
                .user(user1)
                .chatRoomLog(chatRoomLog)
                .logType(MeetingLogType.START)
                .yourLanguage(yourLanguage1)
                .build();

        meetingLogRepository.save(meetingLog1);

        // 미팅 로그를 생성2 (START)
        User user2 = userRepository.findById(userId1).orElseThrow(UserLogNotFoundException::new);
        MeetingLog meetingLog2 = MeetingLog.builder()
                .user(user2)
                .chatRoomLog(chatRoomLog)
                .logType(MeetingLogType.START)
                .yourLanguage(yourLanguage2)
                .build();

        meetingLogRepository.save(meetingLog2);
    }

    // 미팅 종료 시 로직
    public void endMeeting(String sessionId) {
        // redis에서 Meeting Session 정보 확인 중
        MeetingSession meetingSession = meetingSessionRepository.findById(sessionId).orElseThrow(SessionNotFoundException::new);

        Long userId1 = meetingSession.getUserId1();
        Long userId2 = meetingSession.getUserId2();
        Language yourLanguage1 = meetingSession.getYourLanguage1();
        Language yourLanguage2 = meetingSession.getYourLanguage2();


        // 챗룸 로그를 생성 (CLOSE)
        ChatRoomLog chatRoomLog = ChatRoomLog.builder()
                .sessionId(sessionId)
                .logType(ChatRoomLogType.CLOSE)
                .build();

        // 미팅 로그를 생성1 (END)
        User user1 = userRepository.findById(userId1).orElseThrow(UserLogNotFoundException::new);
        MeetingLog meetingLog1 = MeetingLog.builder()
                .user(user1)
                .chatRoomLog(chatRoomLog)
                .logType(MeetingLogType.END)
                .yourLanguage(yourLanguage1)
                .build();

        meetingLogRepository.save(meetingLog1);

        // 미팅 로그를 생성2 (END)
        User user2 = userRepository.findById(userId2).orElseThrow(UserLogNotFoundException::new);
        MeetingLog meetingLog2 = MeetingLog.builder()
                .user(user2)
                .chatRoomLog(chatRoomLog)
                .logType(MeetingLogType.END)
                .yourLanguage(yourLanguage2)
                .build();

        meetingLogRepository.save(meetingLog2);

        // redis에서 Meeting Session을 삭제
        meetingSessionRepository.delete(meetingSession);
    }
}
