package com.a603.youlangme.dto.token;

import lombok.*;

import java.util.Date;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TokenResponseDto {
    private String grantType;
    private String accessToken;
    private String refreshToken;
    //private Long accessTokenExpireDate;
    private Date accessTokenExpireDate;

}
