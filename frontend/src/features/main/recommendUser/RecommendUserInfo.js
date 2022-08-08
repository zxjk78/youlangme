import { useState } from 'react';
import classes from './RecommendUserInfo.module.scss';
import { sendFollow, sendUnFollow } from '../mainAPI';
import UserInfo from '../../profile/LeftProfile/UserInfo/UserInfo';

const RecommendUserInfo = (props) => {
  const [isFollow, setIsFollow] = useState(false);

  const followHandler = async (event) => {
    const targetUserId = event.target.dataset.id;
    let isSuccess;
    if (isFollow) {
      isSuccess = await sendUnFollow(targetUserId);
      if (isSuccess) {
        setIsFollow(() => false);
      }
    } else {
      isSuccess = await sendFollow(targetUserId);
      if (isSuccess) {
        setIsFollow(() => true);
      }
    }
  };

  return (
    <>
      <div className={classes.recommendUser} key={props.id}>
        <UserInfo
          user={{
            id: props.id,
            name: props.name,
            nationality: props.nationality,
          }}
        />
        <button onClick={followHandler} data-id={props.id}>
          {isFollow ? '팔로우 취소' : '팔로우'}
        </button>
      </div>
    </>
  );
};
export default RecommendUserInfo;
