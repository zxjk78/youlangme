package com.a603.youlangme.entity;

import lombok.Getter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@MappedSuperclass // 해당 클래스를 상속하면 이 클래스의 필드들이 Column으로 인식
@EntityListeners(AuditingEntityListener.class) // Auditing 기능을 포함
public abstract class BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @CreatedDate // 생성된 시간 저장
    private LocalDateTime createdDate;

    @LastModifiedDate // Entity의 값을 변경할 때 시간 갱신 저장
    private LocalDateTime modifiedDate;

}
