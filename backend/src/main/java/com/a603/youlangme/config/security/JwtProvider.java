package com.a603.youlangme.config.security;

import com.a603.youlangme.advice.exception.AuthenticationEntryPointException;
import com.a603.youlangme.dto.token.TokenResponseDto;
import com.a603.youlangme.service.WebUserDetailsService;
import io.jsonwebtoken.*;
import io.jsonwebtoken.impl.Base64UrlCodec;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletRequest;
import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.List;

@RequiredArgsConstructor
@Component
public class JwtProvider {

    @Value("${jwt.secret}")
    private String secretKey; // application.properties에 작성한 secret key 불러오기, 가급적 별도의 파일에 작성하는게 좋음
    private final Long accessTokenValidMillisecond = 60 * 60 * 1000L;            //  1 hour
    private final Long refreshTokenValidMillisecond = 14 * 24 * 60 * 60 * 1000L; // 24 hour
    private final WebUserDetailsService userDetailsService;

    @PostConstruct
    protected void init() { // 의존성 주입 이후, secret key를 Base64 인코딩
        secretKey = Base64UrlCodec.BASE64URL.encode(secretKey.getBytes(StandardCharsets.UTF_8));
    }

    // Jwt 생성
    public TokenResponseDto createTokenDto(Long userPk, List<String> roles) {
        // Claim 은 payload 부분에 들어갈 정보 조각들을 의미
        Date now = new Date(); // 생성 날짜
        String accessToken = Jwts.builder()
            // JWT = Header + Payload + Signature
                // 1. Header (토큰 타입, 해싱 알고리즘)
                    .setHeaderParam(Header.TYPE, Header.JWT_TYPE) // JWT Header 작성, TYPE : JWT

                // 2. Payload (Registered, Public, Private)
                    // 2-1. Registered Claim : 토큰에 대한 정보를 담기 위해 미리 정의해 놓은 클레임 집합, 선택적으로 사용 가능
                    .setSubject(String.valueOf(userPk)) // 토큰 제목
                    .setIssuedAt(now) // 토큰이 발급된 시간
                    .setExpiration(new Date(now.getTime() + accessTokenValidMillisecond)) // 토큰의 만료 시간

                    // 2-2. Public Claim : JWT를 사용하는 사람들에 의해 정의되는 클레임, 서버-클라이언트 통신에서는 잘 안쓴다고 함
                    // 없음

                    // 2-3. Private Claim : 보통 클라이언트 <-> 서버 양측 간의 협의하에 사용하는 클레임
                    .claim("roles", roles) // 커스텀 Claim, 역할(사용자 권한)

                // 3. Signature : 헤더 인코딩(Base64) + 페이로드 인코딩(Base64)을 secretKey로 Hash
                    .signWith(SignatureAlgorithm.HS256, secretKey)
                .compact(); // 압축해서 jws 생성

//        LocalDateTime createdTime = LocalDateTime.now().plusHours(1);
//        System.out.println("CREATED TIME : " + createdTime);
//        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
//        String accessTokenExpireDate = createdTime.format(formatter);
//        System.out.println(accessTokenExpireDate);

        String refreshToken = Jwts.builder()
                .setHeaderParam(Header.TYPE, Header.JWT_TYPE)
                .setExpiration(new Date(now.getTime() + refreshTokenValidMillisecond)) // 만료 날짜 세팅
                .signWith(SignatureAlgorithm.HS256, secretKey)
                .compact();
        return TokenResponseDto.builder()
                .grantType("Bearer") // Bearer : JWT 혹은 OAuth에 대한 토큰을 사용한다는 의미
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .accessTokenExpireDate(accessTokenValidMillisecond) // 만료시간을 넘겨줘서 브라우저에서 액세스 토큰이 만료되었는지 확인하는 용도
                .build();
    }

    // Jwt로 인증정보 조회
    public Authentication getAuthentication (String token) {
        Claims claims = parseClaims(token);
        if (claims.get("roles") == null) { // 권한 정보가 없음
            throw new AuthenticationEntryPointException();
        }
        // userDetailService에서 userId를 기준으로 User를 불러와서 UserDetails를 생성
        UserDetails userDetails = userDetailsService.loadUserByUsername(claims.getSubject());

        //Authentication 객체로 만들어서 반환
        return new UsernamePasswordAuthenticationToken(userDetails, "", userDetails.getAuthorities());
    }

    // Jwt 토큰 복호화
    public Claims parseClaims(String token) {
        try {
            return Jwts.parser()
                    .setSigningKey(secretKey) // 복호화
                    .parseClaimsJws(token) // 파싱 & 검증
                    .getBody(); // Decode된 Payload를 리턴
        } catch (ExpiredJwtException e) {
            return e.getClaims();
        }
    }

    // HTTP Request Header에서 Token 파싱 ( "X-AUTH-TOKEN: jwt" )
    public String resolveToken(HttpServletRequest request) {
        System.out.println(request.getHeaderNames());
        return request.getHeader("X-AUTH-TOKEN");
    }

    // jwt의 유효성, 만료일자 검사
    public boolean validationToken(String token) {
        try {
            Jwts.parser()
                    .setSigningKey(secretKey) // secretKey로 복호화
                    .parseClaimsJws(token); // parseClaimsJws : 파싱하고 검증하는데 유효하지 않거나 만료된 토큰이면 예외 발생(JwtException)
            return true;
        } catch (JwtException | IllegalArgumentException e) {
            return false;
        }
    }
}
