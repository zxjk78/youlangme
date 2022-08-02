import UserInfo from '../../../profile/LeftProfile/UserInfo/UserInfo';
import { createdDateCal } from '../../../../utils/functions/commonFunctions';
import classes from './CommentListItem.module.scss';
const API_URL = 'http://127.0.0.1:8080/';

const CommentListItem = (props) => {
  const commentUserInfo = props.commentInfo;
  return (
    <>
      <div className={classes.wrapper}>
        <div className={classes.container}>
          <div className={classes.header}>
            <div className={classes.userContainer}>
              <UserInfo
                user={{
                  id: commentUserInfo.pid,
                  name: commentUserInfo.userName,
                }}
              />
            </div>
            <div>{createdDateCal(commentUserInfo.createDate, false)}</div>
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
