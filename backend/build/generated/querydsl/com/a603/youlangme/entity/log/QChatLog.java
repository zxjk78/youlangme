package com.a603.youlangme.entity.log;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QChatLog is a Querydsl query type for ChatLog
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QChatLog extends EntityPathBase<ChatLog> {

    private static final long serialVersionUID = -2111244695L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QChatLog chatLog = new QChatLog("chatLog");

    public final com.a603.youlangme.entity.QBaseEntity _super = new com.a603.youlangme.entity.QBaseEntity(this);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdTime = _super.createdTime;

    //inherited
    public final NumberPath<Long> id = _super.id;

    public final StringPath lang = createString("lang");

    public final StringPath lang2 = createString("lang2");

    //inherited
    public final DateTimePath<java.time.LocalDateTime> modifiedTime = _super.modifiedTime;

    public final NumberPath<Long> point = createNumber("point", Long.class);

    public final StringPath topic = createString("topic");

    public final QUserLog userLog;

    public final QUserLog userLog2;

    public QChatLog(String variable) {
        this(ChatLog.class, forVariable(variable), INITS);
    }

    public QChatLog(Path<? extends ChatLog> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QChatLog(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QChatLog(PathMetadata metadata, PathInits inits) {
        this(ChatLog.class, metadata, inits);
    }

    public QChatLog(Class<? extends ChatLog> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.userLog = inits.isInitialized("userLog") ? new QUserLog(forProperty("userLog")) : null;
        this.userLog2 = inits.isInitialized("userLog2") ? new QUserLog(forProperty("userLog2")) : null;
    }

}

