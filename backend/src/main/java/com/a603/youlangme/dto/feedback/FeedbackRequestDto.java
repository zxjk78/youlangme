package com.a603.youlangme.dto.feedback;

import com.a603.youlangme.enums.Feedback;
import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class FeedbackRequestDto {
    Feedback feedback;
}
