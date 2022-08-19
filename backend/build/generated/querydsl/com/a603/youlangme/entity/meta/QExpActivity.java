package com.a603.youlangme.entity.meta;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QExpActivity is a Querydsl query type for ExpActivity
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QExpActivity extends EntityPathBase<ExpActivity> {

    private static final long serialVersionUID = 1022458812L;

    public static final QExpActivity expActivity = new QExpActivity("expActivity");

    public final com.a603.youlangme.entity.QBaseEntity _super = new com.a603.youlangme.entity.QBaseEntity(this);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdTime = _super.createdTime;

    public final NumberPath<Integer> exp = createNumber("exp", Integer.class);

    //inherited
    public final NumberPath<Long> id = _super.id;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> modifiedTime = _super.modifiedTime;

    public final StringPath name = createString("name");

    public QExpActivity(String variable) {
        super(ExpActivity.class, forVariable(variable));
    }

    public QExpActivity(Path<? extends ExpActivity> path) {
        super(path.getType(), path.getMetadata());
    }

    public QExpActivity(PathMetadata metadata) {
        super(ExpActivity.class, metadata);
    }

}

