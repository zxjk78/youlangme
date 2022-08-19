package com.a603.youlangme.entity.log;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QFeedLog is a Querydsl query type for FeedLog
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QFeedLog extends EntityPathBase<FeedLog> {

    private static final long serialVersionUID = 468596323L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QFeedLog feedLog = new QFeedLog("feedLog");

    public final com.a603.youlangme.entity.QBaseEntity _super = new com.a603.youlangme.entity.QBaseEntity(this);

    public final com.a603.youlangme.entity.QUser actor;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdTime = _super.createdTime;

    public final NumberPath<Long> detail = createNumber("detail", Long.class);

    //inherited
    public final NumberPath<Long> id = _super.id;

    public final EnumPath<com.a603.youlangme.enums.LogType> logType = createEnum("logType", com.a603.youlangme.enums.LogType.class);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> modifiedTime = _super.modifiedTime;

    public QFeedLog(String variable) {
        this(FeedLog.class, forVariable(variable), INITS);
    }

    public QFeedLog(Path<? extends FeedLog> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QFeedLog(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QFeedLog(PathMetadata metadata, PathInits inits) {
        this(FeedLog.class, metadata, inits);
    }

    public QFeedLog(Class<? extends FeedLog> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.actor = inits.isInitialized("actor") ? new com.a603.youlangme.entity.QUser(forProperty("actor"), inits.get("actor")) : null;
    }

}

