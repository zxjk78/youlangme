package com.a603.youlangme.service.oauth;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

import java.util.HashMap;
import java.util.Map;

@ToString
@Getter
@Builder
public class WebOAuth2Attribute {
    private Map<String, Object> attributes;
    private String attributeKey;
    private String email;
    private String name;
    private String picture;

    static WebOAuth2Attribute of(String provider, String attributeKey,
                                 Map<String, Object> attributes) {
        switch (provider) {
            case "google":
                return ofGoogle(attributeKey, attributes);
//            case "facebook":
//                return ofFacebook("email", attributes);
//            case "instagram":
//                return ofInstagram("id", attributes);
            default:
                throw new RuntimeException();
        }
    }

    private static WebOAuth2Attribute ofGoogle(String attributeKey,
                                               Map<String, Object> attributes) {
        return WebOAuth2Attribute.builder()
                .name((String) attributes.get("name"))
                .email((String) attributes.get("email"))
                .picture((String) attributes.get("picture"))
                .attributes(attributes)
                .attributeKey(attributeKey)
                .build();
    }

    Map<String, Object> convertToMap() {
        Map<String, Object> map = new HashMap<>();
        map.put("id", attributeKey);
        map.put("key", attributeKey);
        map.put("name", name);
        map.put("email", email);
        map.put("picture", picture);

        return map;
    }
}
