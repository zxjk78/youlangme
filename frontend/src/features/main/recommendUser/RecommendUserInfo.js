import { useState } from 'react';
import { sendFollow, sendUnFollow } from '../mainAPI';
import UserInfo from '../../profile/LeftProfile/UserInfo/UserInfo';

import classes from './RecommendUserInfo.module.scss';
import { Button } from '@mui/material';

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
        <div className={classes.recom_user_profile}>
          <UserInfo
            user={{
              id: props.id,
              name: props.name,
              nationality: props.nationality,
            }}
          />
        </div>
        <Button variant='contained' color='secondary' 
          sx={{ width: '130px', borderRadius:'25px', 
            height:'35px', my:'auto', fontWeight: 'bold'}} 
          onClick={followHandler} data-id={props.id}>
          {isFollow ? '팔로우 취소' : '팔로우'}
        </Button>
      </div>
    </>
  );
};
export default RecommendUserInfo;
