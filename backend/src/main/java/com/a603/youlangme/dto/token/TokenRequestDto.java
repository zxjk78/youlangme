package com.a603.youlangme.dto.token;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class TokenRequestDto {
    String accessToken;
    String refreshToken;
    @Builder
    public TokenRequestDto(String accessToken, String refreshToken) {
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
    }
}
