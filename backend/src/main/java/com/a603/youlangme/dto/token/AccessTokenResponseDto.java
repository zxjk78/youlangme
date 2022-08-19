package com.a603.youlangme.dto.token;

import lombok.*;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AccessTokenResponseDto {
    private String accessToken;
    private Date accessTokenExpireDate;
}
