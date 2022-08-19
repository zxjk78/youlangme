package com.a603.youlangme.dto.token;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TokenRequestDto {
    String accessToken;
    String refreshToken;
}
