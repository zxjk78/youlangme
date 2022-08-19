package com.a603.youlangme.entity.log;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QUserLog is a Querydsl query type for UserLog
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QUserLog extends EntityPathBase<UserLog> {

    private static final long serialVersionUID = 1297474838L;

    public static final QUserLog userLog = new QUserLog("userLog");

    public final com.a603.youlangme.entity.QBaseEntity _super = new com.a603.youlangme.entity.QBaseEntity(this);

    public final NumberPath<Long> age = createNumber("age", Long.class);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdTime = _super.createdTime;

    public final StringPath gender = createString("gender");

    //inherited
    public final NumberPath<Long> id = _super.id;

    public final StringPath mbti = createString("mbti");

    //inherited
    public final DateTimePath<java.time.LocalDateTime> modifiedTime = _super.modifiedTime;

    public final StringPath nation = createString("nation");

    public final NumberPath<Long> user_id = createNumber("user_id", Long.class);

    public final StringPath userLanguage = createString("userLanguage");

    public final StringPath wantLanguage = createString("wantLanguage");

    public QUserLog(String variable) {
        super(UserLog.class, forVariable(variable));
    }

    public QUserLog(Path<? extends UserLog> path) {
        super(path.getType(), path.getMetadata());
    }

    public QUserLog(PathMetadata metadata) {
        super(UserLog.class, metadata);
    }

}

