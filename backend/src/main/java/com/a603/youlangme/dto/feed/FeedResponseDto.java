package com.a603.youlangme.dto.feed;


import com.a603.youlangme.enums.LogType;
import com.a603.youlangme.enums.Notification;
import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class FeedResponseDto {

    String userName;

    Long userId;

    LogType logType;

    Long detail;

    Notification notification;

}
