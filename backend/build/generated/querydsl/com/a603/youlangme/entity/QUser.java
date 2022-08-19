package com.a603.youlangme.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QUser is a Querydsl query type for User
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QUser extends EntityPathBase<User> {

    private static final long serialVersionUID = -1331871900L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QUser user = new QUser("user");

    public final QBaseEntity _super = new QBaseEntity(this);

    public final DatePath<java.time.LocalDate> birthDay = createDate("birthDay", java.time.LocalDate.class);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdTime = _super.createdTime;

    public final StringPath description = createString("description");

    public final StringPath email = createString("email");

    public final QUserExp expInfo;

    public final ListPath<MatchingFeedback, QMatchingFeedback> feedbacks = this.<MatchingFeedback, QMatchingFeedback>createList("feedbacks", MatchingFeedback.class, QMatchingFeedback.class, PathInits.DIRECT2);

    public final ListPath<Feed, QFeed> feedList = this.<Feed, QFeed>createList("feedList", Feed.class, QFeed.class, PathInits.DIRECT2);

    public final ListPath<Follow, QFollow> followees = this.<Follow, QFollow>createList("followees", Follow.class, QFollow.class, PathInits.DIRECT2);

    public final ListPath<Follow, QFollow> followers = this.<Follow, QFollow>createList("followers", Follow.class, QFollow.class, PathInits.DIRECT2);

    public final EnumPath<com.a603.youlangme.enums.Gender> gender = createEnum("gender", com.a603.youlangme.enums.Gender.class);

    //inherited
    public final NumberPath<Long> id = _super.id;

    public final StringPath image = createString("image");

    //inherited
    public final DateTimePath<java.time.LocalDateTime> modifiedTime = _super.modifiedTime;

    public final EnumPath<com.a603.youlangme.enums.Language> mylanguage = createEnum("mylanguage", com.a603.youlangme.enums.Language.class);

    public final StringPath name = createString("name");

    public final EnumPath<com.a603.youlangme.enums.Nationality> nationality = createEnum("nationality", com.a603.youlangme.enums.Nationality.class);

    public final StringPath password = createString("password");

    public final ListPath<String, StringPath> roles = this.<String, StringPath>createList("roles", String.class, StringPath.class, PathInits.DIRECT2);

    public final ListPath<UserBoardLike, QUserBoardLike> userBoardLikes = this.<UserBoardLike, QUserBoardLike>createList("userBoardLikes", UserBoardLike.class, QUserBoardLike.class, PathInits.DIRECT2);

    public final ListPath<UserFavorite, QUserFavorite> userFavorites = this.<UserFavorite, QUserFavorite>createList("userFavorites", UserFavorite.class, QUserFavorite.class, PathInits.DIRECT2);

    public final EnumPath<com.a603.youlangme.enums.Language> yourlanguage = createEnum("yourlanguage", com.a603.youlangme.enums.Language.class);

    public QUser(String variable) {
        this(User.class, forVariable(variable), INITS);
    }

    public QUser(Path<? extends User> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QUser(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QUser(PathMetadata metadata, PathInits inits) {
        this(User.class, metadata, inits);
    }

    public QUser(Class<? extends User> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.expInfo = inits.isInitialized("expInfo") ? new QUserExp(forProperty("expInfo"), inits.get("expInfo")) : null;
    }

}

