package com.a603.youlangme.entity.log;

import com.a603.youlangme.entity.BaseEntity;
import lombok.*;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.io.Serializable;
@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserLog  extends BaseEntity implements Serializable {

    private Long age;

    private String gender;

    private String nation;

    private String mbti;

    private String userLanguage;

    private String wantLanguage;

    private Long user_id;

}
