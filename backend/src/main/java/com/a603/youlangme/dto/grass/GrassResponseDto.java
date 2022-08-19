package com.a603.youlangme.dto.grass;

import lombok.*;

import java.io.Serializable;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class GrassResponseDto implements Serializable {


    String day;

    int value;
}
