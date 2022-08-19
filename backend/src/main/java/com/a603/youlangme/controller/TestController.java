package com.a603.youlangme.controller;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@Api(tags = "3. AccessToken")
@RequiredArgsConstructor
@RestController
public class TestController {

    @ApiOperation(value = "로그인 후 이용", notes = "액세스 토큰이 필요한 요청")
    @PostMapping("/access")
    public ResponseEntity access () {
        SecurityContext context = SecurityContextHolder.getContext();
        Authentication authentication = context.getAuthentication();
        //System.out.println(authentication.getName());
        //System.out.println(((User)authentication.getPrincipal()).getName());

        return new ResponseEntity(HttpStatus.OK);
    }

}
