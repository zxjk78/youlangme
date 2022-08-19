package com.a603.youlangme.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QFavorite is a Querydsl query type for Favorite
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QFavorite extends EntityPathBase<Favorite> {

    private static final long serialVersionUID = -434984779L;

    public static final QFavorite favorite = new QFavorite("favorite");

    public final QBaseEntity _super = new QBaseEntity(this);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdTime = _super.createdTime;

    //inherited
    public final NumberPath<Long> id = _super.id;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> modifiedTime = _super.modifiedTime;

    public final StringPath name = createString("name");

    public final ListPath<UserFavorite, QUserFavorite> userFavoriteList = this.<UserFavorite, QUserFavorite>createList("userFavoriteList", UserFavorite.class, QUserFavorite.class, PathInits.DIRECT2);

    public QFavorite(String variable) {
        super(Favorite.class, forVariable(variable));
    }

    public QFavorite(Path<? extends Favorite> path) {
        super(path.getType(), path.getMetadata());
    }

    public QFavorite(PathMetadata metadata) {
        super(Favorite.class, metadata);
    }

}

