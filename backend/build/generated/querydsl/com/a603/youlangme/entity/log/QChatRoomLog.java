package com.a603.youlangme.entity.log;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QChatRoomLog is a Querydsl query type for ChatRoomLog
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QChatRoomLog extends EntityPathBase<ChatRoomLog> {

    private static final long serialVersionUID = -57773810L;

    public static final QChatRoomLog chatRoomLog = new QChatRoomLog("chatRoomLog");

    public final com.a603.youlangme.entity.QBaseEntity _super = new com.a603.youlangme.entity.QBaseEntity(this);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdTime = _super.createdTime;

    //inherited
    public final NumberPath<Long> id = _super.id;

    public final EnumPath<com.a603.youlangme.enums.ChatRoomLogType> logType = createEnum("logType", com.a603.youlangme.enums.ChatRoomLogType.class);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> modifiedTime = _super.modifiedTime;

    public final StringPath sessionId = createString("sessionId");

    public QChatRoomLog(String variable) {
        super(ChatRoomLog.class, forVariable(variable));
    }

    public QChatRoomLog(Path<? extends ChatRoomLog> path) {
        super(path.getType(), path.getMetadata());
    }

    public QChatRoomLog(PathMetadata metadata) {
        super(ChatRoomLog.class, metadata);
    }

}

