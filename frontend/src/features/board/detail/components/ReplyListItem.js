import UserInfo from '../../../profile/LeftProfile/UserInfo/UserInfo';
import { createdDateCal } from '../../../../common/utils/functions/commonFunctions'
import classes from './ReplyListItem.module.scss';
import { API_URL } from '../../../../common/api/http-config';

const ReplyListItem = (props) => {
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

export default ReplyListItem;
