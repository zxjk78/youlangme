package com.a603.youlangme.dto.ranking;

import lombok.*;

import java.io.Serializable;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RankLogResponseDto implements Serializable {

    private String name;

    private int rank;

    private int lv;
}
