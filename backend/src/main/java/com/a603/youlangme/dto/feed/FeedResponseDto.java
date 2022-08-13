package com.a603.youlangme.dto.feed;


import com.a603.youlangme.enums.LogType;
import com.a603.youlangme.enums.Notification;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
@Getter
public class FeedResponseDto {

    private LocalDateTime createdTime;

    private LocalDateTime modifiedTime;

    private String userName;

    private Long userId;

    private LogType logType;

    private Long detail;

    private String contents;

    private Notification notification;

    private List<String> imgList = new ArrayList<>();
}
