package com.a603.youlangme.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QUserExp is a Querydsl query type for UserExp
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QUserExp extends EntityPathBase<UserExp> {

    private static final long serialVersionUID = -887822311L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QUserExp userExp = new QUserExp("userExp");

    public final QBaseEntity _super = new QBaseEntity(this);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdTime = _super.createdTime;

    public final NumberPath<Integer> exp = createNumber("exp", Integer.class);

    //inherited
    public final NumberPath<Long> id = _super.id;

    public final com.a603.youlangme.entity.meta.QLevel level;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> modifiedTime = _super.modifiedTime;

    public final QUser user;

    public QUserExp(String variable) {
        this(UserExp.class, forVariable(variable), INITS);
    }

    public QUserExp(Path<? extends UserExp> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QUserExp(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QUserExp(PathMetadata metadata, PathInits inits) {
        this(UserExp.class, metadata, inits);
    }

    public QUserExp(Class<? extends UserExp> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.level = inits.isInitialized("level") ? new com.a603.youlangme.entity.meta.QLevel(forProperty("level")) : null;
        this.user = inits.isInitialized("user") ? new QUser(forProperty("user"), inits.get("user")) : null;
    }

}

