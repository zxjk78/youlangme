package com.a603.youlangme.dto.log;


import com.a603.youlangme.enums.LogType;
import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class LogResponseDto {

    String userName;

    Long userId;

    LogType logType;

    Long detail;

}
