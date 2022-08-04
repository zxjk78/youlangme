package com.a603.youlangme.dto.like;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
@AllArgsConstructor
public class LikeUserCntDto implements Serializable {
    int likeCnt;
}


