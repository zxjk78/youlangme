package com.a603.youlangme.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.net.MalformedURLException;

@RestController
@RequestMapping("/image")
public class ImageController {

    @Value("${image.board.path}")
    private String boardPath;

    @Value("${image.profile.path}")
    private String profilePath;

    // img 태그 src로 불러오기
    @ResponseBody
    @GetMapping("/board/{filename}")
    public Resource showBoardImage(@PathVariable String filename) throws MalformedURLException {
        String path = System.getProperty("user.dir"); // 현재 디렉토리 가져오기
        File file = new File(path + boardPath + filename);
        return new UrlResource("file:"+file.getPath());
    }

    @ResponseBody
    @GetMapping("/profile/{filename}")
    public Resource showProfileImage(@PathVariable String filename) throws MalformedURLException {
        String path = System.getProperty("user.dir"); // 현재 디렉토리 가져오기
        File file = new File(path + profilePath + filename);
        return new UrlResource("file:"+file.getPath());
    }

}
