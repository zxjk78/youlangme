package com.a603.youlangme.dto.matching;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
@AllArgsConstructor
public class MatchingResponseDto {
    String SessionId;
    Long opponentId;
    String message;
}
