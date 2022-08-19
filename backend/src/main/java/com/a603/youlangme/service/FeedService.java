package com.a603.youlangme.service;

import com.a603.youlangme.dto.feed.FeedPageResponseDto;
import com.a603.youlangme.dto.feed.FeedResponseDto;
import com.a603.youlangme.entity.Board;
import com.a603.youlangme.entity.BoardImg;
import com.a603.youlangme.entity.Feed;
import com.a603.youlangme.entity.User;
import com.a603.youlangme.entity.log.FeedLog;
import com.a603.youlangme.enums.LogType;
import com.a603.youlangme.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class FeedService {
    private final ResponseService responseService;
    private final UserRepository userRepository;
    private final FeedRepository feedRepository;
    private final BoardRepository boardRepository;
    private final BoardImgRepository boardImgRepository;

    public FeedPageResponseDto getFeeds(User user) {
        List<Feed> feeds = feedRepository.findTop5ByUserIdOrderByIdDesc(user.getId());
        List<FeedResponseDto> feedResponseDtos = new ArrayList<>();
        for (Feed feed : feeds) {
            FeedLog feedLog = feed.getFeedLog();
            if (feedLog.getLogType() == LogType.WRITE_POST) {
                Board board = boardRepository.findBoardById(feedLog.getDetail());
                if (board == null) continue;
                List<BoardImg> boardImgList = boardImgRepository.findAllByBoard(board);
                List<String> images = new ArrayList<>();
                for (BoardImg img : boardImgList) {
                    images.add(img.getPath());
                }
                FeedResponseDto feedResponseDto = new FeedResponseDto(feedLog.getCreatedTime(), feedLog.getModifiedTime(), feedLog.getActor().getName(), feedLog.getActor().getId(), feedLog.getLogType(), feedLog.getDetail(), board.getContents(), feed.getNotification(), images);
                feedResponseDtos.add(feedResponseDto);
            }
            else if (feedLog.getLogType() == LogType.FOLLOWED) {
                FeedResponseDto feedResponseDto = new FeedResponseDto(feedLog.getCreatedTime(), feedLog.getModifiedTime(), feedLog.getActor().getName(), feedLog.getActor().getId(), feedLog.getLogType(), feedLog.getDetail(), "None", feed.getNotification(), null);
                feedResponseDtos.add(feedResponseDto);
            }
        }
        Long nextId = -1L;
        if (feeds.size() == 5)
            nextId = feeds.get(4).getId();
        FeedPageResponseDto feedPageResponseDto = new FeedPageResponseDto(feedResponseDtos, nextId);
        return feedPageResponseDto;
    }


    public FeedPageResponseDto getMoreFeeds(User user, Long id) {
        List<Feed> feeds = feedRepository.findTop5ByUserIdAndIdLessThanOrderByIdDesc(user.getId(), id);
        List<FeedResponseDto> feedResponseDtos = new ArrayList<>();
        for (Feed feed : feeds) {
            FeedLog feedLog = feed.getFeedLog();
            if (feedLog.getLogType() == LogType.WRITE_POST) {
                Board board = boardRepository.findBoardById(feedLog.getDetail());
                List<BoardImg> boardImgList = boardImgRepository.findAllByBoard(board);
                List<String> images = new ArrayList<>();
                for (BoardImg img : boardImgList) {
                    images.add(img.getPath());
                }
                FeedResponseDto feedResponseDto = new FeedResponseDto(feedLog.getCreatedTime(), feedLog.getModifiedTime(), feedLog.getActor().getName(), feedLog.getActor().getId(), feedLog.getLogType(), feedLog.getDetail(), board.getContents(), feed.getNotification(), images);
                feedResponseDtos.add(feedResponseDto);
            }
            else if (feedLog.getLogType() == LogType.FOLLOWED) {
                FeedResponseDto feedResponseDto = new FeedResponseDto(feedLog.getCreatedTime(), feedLog.getModifiedTime(), feedLog.getActor().getName(), feedLog.getActor().getId(), feedLog.getLogType(), feedLog.getDetail(), "None", feed.getNotification(), null);
                feedResponseDtos.add(feedResponseDto);
            }
        }
        Long nextId = -1L;
        if (feeds.size() == 5)
            nextId = feeds.get(4).getId();
        FeedPageResponseDto feedPageResponseDto = new FeedPageResponseDto(feedResponseDtos, nextId);
        return feedPageResponseDto;
    }
}

