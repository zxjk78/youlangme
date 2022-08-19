package com.a603.youlangme.entity.log;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QExpAcquisitionLog is a Querydsl query type for ExpAcquisitionLog
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QExpAcquisitionLog extends EntityPathBase<ExpAcquisitionLog> {

    private static final long serialVersionUID = -2138386095L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QExpAcquisitionLog expAcquisitionLog = new QExpAcquisitionLog("expAcquisitionLog");

    public final com.a603.youlangme.entity.QBaseEntity _super = new com.a603.youlangme.entity.QBaseEntity(this);

    public final com.a603.youlangme.entity.meta.QExpActivity activity;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdTime = _super.createdTime;

    //inherited
    public final NumberPath<Long> id = _super.id;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> modifiedTime = _super.modifiedTime;

    public final NumberPath<Long> targetId = createNumber("targetId", Long.class);

    public final com.a603.youlangme.entity.QUser user;

    public QExpAcquisitionLog(String variable) {
        this(ExpAcquisitionLog.class, forVariable(variable), INITS);
    }

    public QExpAcquisitionLog(Path<? extends ExpAcquisitionLog> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QExpAcquisitionLog(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QExpAcquisitionLog(PathMetadata metadata, PathInits inits) {
        this(ExpAcquisitionLog.class, metadata, inits);
    }

    public QExpAcquisitionLog(Class<? extends ExpAcquisitionLog> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.activity = inits.isInitialized("activity") ? new com.a603.youlangme.entity.meta.QExpActivity(forProperty("activity")) : null;
        this.user = inits.isInitialized("user") ? new com.a603.youlangme.entity.QUser(forProperty("user"), inits.get("user")) : null;
    }

}

