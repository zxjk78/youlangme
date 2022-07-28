import classes from './CommentListItem.module.scss';
const API_URL = 'http://127.0.0.1:8080/';

const CommentListItem = (props) => {
  const commentUserInfo = props.commentInfo;
  // console.log(commentUserInfo);
  return (
    <>
      <div className={classes.wrapper}>
        <div className={classes.container}>
          <div className={classes.header}>
            <div className={classes.userContainer}>
              <div>
                <img
                  src={`${API_URL}image/profile/${commentUserInfo.pid}.jpg`}
                  alt=""
                />
              </div>
              <div>{commentUserInfo.username}</div>
            </div>
            <div>{commentUserInfo.createDate}</div>
          </div>
          <div className={classes.commentContainer}>
            {commentUserInfo.contents}
          </div>
        </div>
      </div>
    </>
  );
};

export default CommentListItem;
