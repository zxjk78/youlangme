package com.a603.youlangme.entity;

import com.a603.youlangme.enums.Gender;
import com.a603.youlangme.enums.Language;
import com.a603.youlangme.enums.Nationality;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@Getter
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "user")
public class User extends BaseEntity implements UserDetails {

    @Column(unique = true, nullable = true, length = 30)
    String name;

    @Column(nullable = false, unique = true, length = 50)
    String email;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @Column(nullable = false, length = 100)
    String password;

    @Column(nullable = false)
    private int age;

    @Enumerated(EnumType.STRING)
    private Nationality nationality;

    //enum으로 해결
    @Enumerated(EnumType.STRING)
    private Gender gender;

    private Long exp = 0L;

    @Enumerated(EnumType.STRING)
    private Language mylanguage;

    @Enumerated(EnumType.STRING)
    private Language yourlanguage;


    // Profile start

    @Column(nullable = true, length = 50)
    private String description;

    @Column(nullable = true, length = 255)
    private String image;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<UserBadge> userBadges = new ArrayList<>();

    public void updateDescription(String description) {
        this.description = description;
    }

    public void updateImage(String image) {
        this.image = image;
    }

    // Profile end




    @ElementCollection(fetch = FetchType.EAGER) // Proxy 객체가 반환되어 권한을 제대로 확인할 수 없는 경우를 방지
    @Builder.Default
    private List<String> roles = new ArrayList<>();

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return this.roles.stream().map(SimpleGrantedAuthority::new).collect(Collectors.toList());
    }

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @Override
    public String getUsername() {
        return this.email;
    }

    // 아래 4개의 메소드는 security가 제공하는 회원 보안 관련 메소드인데 사용하지 않으므로 기본 true로 세팅

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @Override
    public boolean isEnabled() {
        return true;
    }




    // 내가 팔로우 하는 사람들
    @OneToMany(mappedBy = "follower", cascade = CascadeType.ALL)
    private List<Follow> followees = new ArrayList<>();

    // 나를 팔로우 해주는 사람들
    @OneToMany(mappedBy = "followee", cascade = CascadeType.ALL)
    private List<Follow> followers = new ArrayList<>();


    @OneToMany(mappedBy="user", cascade = CascadeType.ALL)
    private  List<UserFavorite> userFavorites;


    public void updateBasicInfo(String name, Language myLanguage, Language yourLanguage, Nationality nationality) {
        this.name = name;
        this.mylanguage = myLanguage;
        this.yourlanguage = yourLanguage;
        this.nationality = nationality;
    }
}
