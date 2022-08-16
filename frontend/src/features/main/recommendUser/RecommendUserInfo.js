import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import UserInfo from '../../profile/LeftProfile/UserInfo/UserInfo';

import classes from './RecommendUserInfo.module.scss';
import { Button } from '@mui/material';
import styled from '@emotion/styled';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {
  fetchFollowOrNot,
  sendFollow,
  sendUnfollow,
} from '../../profile/LeftProfile/Follow/FollowAPI';

const FollowButon = styled(Button)`
  width: 100px;
  height: 30px;
  border-radius: 25px;
  font-weight: bold;
  background-color: #ffc700;
`;

const UnFollowButon = styled(FollowButon)`
  background-color: #9ba7af;
`;

const RecommendUserInfo = (props) => {
  const userId = props.userId;
  const userName = props.userName;
  const [isFollowed, setIsFollowed] = useState(false);
  const { currentUser } = useSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(true);

  const followHandler = async () => {
    // const targetUserId = event.target.dataset.id;
    // props.onFollowChangeHandler(true);

    let getResult;
    if (isFollowed) {
      getResult = await sendUnfollow(userId);
      setIsFollowed(() => getResult);
    } else {
      getResult = await sendFollow(userId);
      if (getResult) {
        setIsFollowed(() => getResult);
      }
    }
  };

  useEffect(() => {
    (async () => {
      const getFollowOrNot = await fetchFollowOrNot(userId, currentUser.id);
      setIsFollowed(getFollowOrNot);
      setIsLoading(false);
    })();

    return () => {
      setIsLoading(true);
    };
  }, [userId, isFollowed, currentUser]);

  return (
    <>
      <div className={classes.recommendUser} key={userId}>
        <div className={classes.recom_user_profile}>
          <UserInfo
            user={{
              id: userId,
              name: userName,
            }}
          />
        </div>
        {isFollowed ? (
          <UnFollowButon
            onClick={followHandler}
            variant="contained"
            size="small"
            className={classes.unfollow}
          >
            팔로우 취소
          </UnFollowButon>
        ) : (
          <FollowButon onClick={followHandler} variant="contained" size="small">
            팔로우
          </FollowButon>
        )}
      </div>
    </>
  );
};
export default RecommendUserInfo;
