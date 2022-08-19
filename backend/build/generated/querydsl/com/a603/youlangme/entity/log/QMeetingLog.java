package com.a603.youlangme.entity.log;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QMeetingLog is a Querydsl query type for MeetingLog
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QMeetingLog extends EntityPathBase<MeetingLog> {

    private static final long serialVersionUID = 2078307404L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QMeetingLog meetingLog = new QMeetingLog("meetingLog");

    public final com.a603.youlangme.entity.QBaseEntity _super = new com.a603.youlangme.entity.QBaseEntity(this);

    public final QChatRoomLog chatRoomLog;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdTime = _super.createdTime;

    //inherited
    public final NumberPath<Long> id = _super.id;

    public final EnumPath<com.a603.youlangme.enums.MeetingLogType> logType = createEnum("logType", com.a603.youlangme.enums.MeetingLogType.class);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> modifiedTime = _super.modifiedTime;

    public final com.a603.youlangme.entity.QUser user;

    public final EnumPath<com.a603.youlangme.enums.Language> yourLanguage = createEnum("yourLanguage", com.a603.youlangme.enums.Language.class);

    public QMeetingLog(String variable) {
        this(MeetingLog.class, forVariable(variable), INITS);
    }

    public QMeetingLog(Path<? extends MeetingLog> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QMeetingLog(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QMeetingLog(PathMetadata metadata, PathInits inits) {
        this(MeetingLog.class, metadata, inits);
    }

    public QMeetingLog(Class<? extends MeetingLog> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.chatRoomLog = inits.isInitialized("chatRoomLog") ? new QChatRoomLog(forProperty("chatRoomLog")) : null;
        this.user = inits.isInitialized("user") ? new com.a603.youlangme.entity.QUser(forProperty("user"), inits.get("user")) : null;
    }

}

