// react core
import { Link } from 'react-router-dom';
// API

// external module

// external component

// custom component

// css
import classes from './FeedFollowItem.module.scss';
// etc
import { createdDateCal } from '../../../common/utils/functions/commonFunctions';

const FeedFollowItem = (props) => {
  return (
    <>
      <div className={classes.wrapper}>
        <div className={classes.container}>
          <div className={classes.main}>
            <div>
              <Link
                to={`/profile/${props.followInfo.userId}`}
                style={{ textDecoration: 'none', color: 'black' }}
              >
                <span>{props.followInfo.userName}</span>
              </Link>
              님이 회원님을 <br />
              팔로우하기 시작했습니다.
            </div>
            <div className={classes.createdAt}>
              {createdDateCal(props.followInfo.createdTime, false)}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default FeedFollowItem;
