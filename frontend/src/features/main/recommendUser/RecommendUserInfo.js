import { useState } from 'react';
import classes from './RecommendUserInfo.module.scss';
import { sendFollow, sendUnFollow } from '../mainAPI';
import UserInfo from '../../profile/LeftProfile/UserInfo/UserInfo';

const RecommendUserInfo = (props) => {
  const [isFollow, setIsFollow] = useState(false);

  const followHandler = async (event) => {
    const targetUserId = event.target.dataset.id;
    let data;
    if (isFollow) {
      data = await sendUnFollow(targetUserId);
      if (data) {
        setIsFollow(() => false);
      }
    } else {
      data = await sendFollow(targetUserId);
      if (data) {
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
