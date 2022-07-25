package com.a603.youlangme.controller;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.net.MalformedURLException;

@RestController
@RequestMapping("/image")
public class ImageController {


    // img 태그 src로 불러오기
    @ResponseBody
    @GetMapping("/{filename}")
    public Resource showImage(@PathVariable String filename) throws MalformedURLException {
        String path = System.getProperty("user.dir"); // 현재 디렉토리 가져오기
        File file = new File(path + "/src/main/resources/static/" + filename);
        return new UrlResource("file:"+file.getPath());
    }

}
