package com.a603.youlangme.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QMatchingFeedback is a Querydsl query type for MatchingFeedback
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QMatchingFeedback extends EntityPathBase<MatchingFeedback> {

    private static final long serialVersionUID = -994417477L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QMatchingFeedback matchingFeedback = new QMatchingFeedback("matchingFeedback");

    public final QBaseEntity _super = new QBaseEntity(this);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdTime = _super.createdTime;

    public final NumberPath<Integer> feedback = createNumber("feedback", Integer.class);

    //inherited
    public final NumberPath<Long> id = _super.id;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> modifiedTime = _super.modifiedTime;

    public final QUser user;

    public QMatchingFeedback(String variable) {
        this(MatchingFeedback.class, forVariable(variable), INITS);
    }

    public QMatchingFeedback(Path<? extends MatchingFeedback> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QMatchingFeedback(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QMatchingFeedback(PathMetadata metadata, PathInits inits) {
        this(MatchingFeedback.class, metadata, inits);
    }

    public QMatchingFeedback(Class<? extends MatchingFeedback> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.user = inits.isInitialized("user") ? new QUser(forProperty("user"), inits.get("user")) : null;
    }

}

