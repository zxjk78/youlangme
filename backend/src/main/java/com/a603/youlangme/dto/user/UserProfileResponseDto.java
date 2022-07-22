package com.a603.youlangme.dto.user;

import com.a603.youlangme.dto.badge.BadgeResponseDto;
import com.a603.youlangme.entity.Favorite;
import lombok.*;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;

import java.util.ArrayList;
import java.util.List;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Setter
public class UserProfileResponseDto {

    public String name;

    public String description;

    public String userImage;

    public Long exp;

    public List<String> favorites = new ArrayList<>();

    public List<BadgeResponseDto> badgeResponseDtos = new ArrayList<>();



}
