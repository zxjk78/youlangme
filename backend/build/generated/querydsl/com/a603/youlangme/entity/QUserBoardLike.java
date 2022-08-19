package com.a603.youlangme.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QUserBoardLike is a Querydsl query type for UserBoardLike
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QUserBoardLike extends EntityPathBase<UserBoardLike> {

    private static final long serialVersionUID = 1195057305L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QUserBoardLike userBoardLike = new QUserBoardLike("userBoardLike");

    public final QBaseEntity _super = new QBaseEntity(this);

    public final QBoard board;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdTime = _super.createdTime;

    //inherited
    public final NumberPath<Long> id = _super.id;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> modifiedTime = _super.modifiedTime;

    public final QUser user;

    public QUserBoardLike(String variable) {
        this(UserBoardLike.class, forVariable(variable), INITS);
    }

    public QUserBoardLike(Path<? extends UserBoardLike> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QUserBoardLike(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QUserBoardLike(PathMetadata metadata, PathInits inits) {
        this(UserBoardLike.class, metadata, inits);
    }

    public QUserBoardLike(Class<? extends UserBoardLike> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.board = inits.isInitialized("board") ? new QBoard(forProperty("board"), inits.get("board")) : null;
        this.user = inits.isInitialized("user") ? new QUser(forProperty("user"), inits.get("user")) : null;
    }

}

