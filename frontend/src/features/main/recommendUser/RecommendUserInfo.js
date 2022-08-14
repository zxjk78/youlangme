import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'

import UserInfo from '../../profile/LeftProfile/UserInfo/UserInfo';

import classes from './RecommendUserInfo.module.scss';
import { Button } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { fetchFollowOrNot, sendFollow, sendUnfollow } from '../../profile/LeftProfile/Follow/FollowAPI';


const myColorTheme = createTheme({
  palette: {
    followBtnColor: {
      // grey 컬러 '#9BA7AF'
      main: '#9BA7AF',
    },
    unfollowBtnColor: {
      // yellow color
      main: '#FFC700',
      
    },
  },
});

const RecommendUserInfo = (props) => {

  const userId = props.userId
  const [isFollowed, setIsFollowed] = useState(false);
  const { currentUser } = useSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(true);

  
  const followHandler = async () => {
    // const targetUserId = event.target.dataset.id;
    // props.onFollowChangeHandler(true);
    
    let getResult;
    if (isFollowed) {
      getResult= await sendUnfollow(userId);
        setIsFollowed(() => getResult);
  
    } else {
      getResult = await sendFollow(userId);
      if (getResult) {
        setIsFollowed(() => getResult);
      }
    }
  };


  useEffect(() => {
    (
      async () => {
        const getFollowOrNot = await fetchFollowOrNot(userId, currentUser.id);
        setIsFollowed(getFollowOrNot);
        setIsLoading(false);
      })();

    return () => {
      setIsLoading(true)
    }
  }, [userId, isFollowed, currentUser]);


  return (
    <>
      <div className={classes.recommendUser} key={userId}>
        <div className={classes.recom_user_profile}>
          <UserInfo
            user={{
              id: userId,
              name: props.name,
              nationality: props.nationality,
            }}
          />
        </div>
        <ThemeProvider theme={myColorTheme}>
          {
            isFollowed
            ? <Button onClick={followHandler} variant="contained" 
            size="small" className={classes.unfollow} color="followBtnColor"
            sx={{ width: '130px', borderRadius:'25px', 
            height:'35px', my:'auto', fontWeight: 'bold', letterSpacing: 3, color: '#FFFFFF'}}>
              팔로우 취소</Button>
        
            : <Button onClick={followHandler} variant="contained" 
                size="small" color="unfollowBtnColor"
                sx={{ width: '130px', borderRadius:'25px', 
                height:'35px', my:'auto', letterSpacing: 3, fontWeight: 'bold', color: '#FFFFFF' }}>
                  팔로우</Button>
          }
          {/* <Button variant='contained' color='secondary' 
            sx={{ width: '130px', borderRadius:'25px', 
              height:'35px', my:'auto', fontWeight: 'bold'}} 
            onClick={followHandler} data-id={props.id}>
            {isFollow ? '팔로우 취소' : '팔로우'}
          </Button> */}

        </ThemeProvider>
      </div>
    </>
  );
};
export default RecommendUserInfo;
