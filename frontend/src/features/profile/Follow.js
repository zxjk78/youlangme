import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { follow, unfollow } from './profileSlice'


// 리덕스 안거치는 단순 서버 통신 API
import { fetchFollowCnt, fetchFollowees, fetchFollowers } from './FollowAPI';

// css
import classes from './Follow.module.scss';

// Mui
import { Button  } from '@mui/material';
import { Group } from '@mui/icons-material';


const Follow = (props) => {
    // redux
    const { currentUser } = useSelector((state) => state.auth);
    const { isFollowed } = useSelector((state) => state.profile);

    // const {userInfo} =userLogin
    const dispatch = useDispatch()

    const profileId = props.profileUserId
    const isCurrentUser = currentUser.id === Number(profileId);
    // console.log(currentUser)
    
    
    const [followCnt, setFollowCnt] = useState({
      followerCnt: 0, followeeCnt: 0
    });
    const [followers, setFollowers] = useState([]);
    const [followees, setFollowees] = useState([]);

    // const [isFollow, setIsFollow] = useState(false);
    // if (followers.find(flwer=>flwer.id === profileId)){setIsButtonFollowed(true)}

    const [showFollowers, setShowFollowers] = useState(false)
    const [showFollowing, setShowFollowing] = useState(false)

    const followHandler = () => {
      dispatch(follow(profileId))
      console.log('팔로우 버튼 클릭')
      // sendFollow(setIsFollowed, profileId)
      // getIsFollowed(true)
    }
    const unfollowHandler = () => {
      // sendUnfollow(setIsFollowed, profileId)
      dispatch(unfollow(profileId))
      // getIsFollowed(false)
    }
    
    // // 해당 프로필 유저의 팔로워들 중에서 currentUser의 id가 있으면 unfollow 버튼을 만들어주고 없으면 팔로우 버튼을 보여줌.
    useEffect(() => {
      fetchFollowCnt(setFollowCnt, profileId);
      fetchFollowers(setFollowers, profileId);
      fetchFollowees(setFollowees, profileId);
      
      }, [ profileId, isFollowed ])
      


     
  


    // !!!!!!!!!!!!!!!!!! 팔로워 숫자 누르면 모달로 리스트 띄우는거 만들기!!!!!!
    return (
        <>


          {/* {!isCurrentUser &&  <FollowBtn flwrs={followers} flwees={followees} prfleId={profileId} getIsFollowed={getFollowed}/>} */}
          
          {!isCurrentUser && isFollowed &&
            <Button onClick={unfollowHandler} variant="contained" 
              size="small" fullWidth className={classes.unfollow} color="primary"
              sx={{borderRadius: '25px', letterSpacing: 3 }}>언팔로우</Button>}
  
          {!isCurrentUser && !isFollowed &&
            <Button onClick={followHandler} variant="contained" 
              size="small" fullWidth color="secondary"
              sx={{borderRadius: '25px', letterSpacing: 3 }}>팔로우</Button>
          }
                        

          <div className={classes.follow}>
            <Group sx={{  fontSize: 27, mx: 2, color: '#B8C5D0'}} />
            <div className={classes.followCnt}>
              <span className={classes.follow_greys} onClick={ () => setShowFollowers(true)} >팔로워 </span>
              <span className={classes.cnt} >{followCnt.followerCnt} </span>
              <span className={classes.follow_greys} onClick={ () => setShowFollowing(true)}>팔로잉 </span>
              <span className={classes.cnt}>{followCnt.followeeCnt} </span>
            </div>
          </div>
        </>
    )
}


export default Follow;



