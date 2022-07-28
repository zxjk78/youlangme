
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from "react-router-dom";
// component
// import Followers from './Followers';
// import Followings from './Followings';

// 리덕스 안거치는 단순 서버 통신 API
import { fetchFollowCnt, fetchFollowers, fetchFollowees, sendFollow, sendUnfollow, fetchFollowOrNot } from './FollowAPI';


// css
import classes from './Follow.module.scss';

// Mui
import { Avatar, Button, CircularProgress, Dialog, DialogTitle, List, ListItem, ListItemAvatar, ListItemText, Modal  } from '@mui/material';
import { Group } from '@mui/icons-material';


const API_URL = 'http://127.0.0.1:8080/';

const Follow = (props) => {

    const history = useHistory();
    // redux
    const { currentUser } = useSelector((state) => state.auth);


    const profileId = props.profileUserId
    const isCurrentUser = currentUser.id === Number(profileId);
    // console.log(currentUser)
    
    
    const [followCnt, setFollowCnt] = useState({
      followerCnt: 0, followeeCnt: 0
    });
    const [followers, setFollowers] = useState([]);
    const [followees, setFollowees] = useState([]);
    const [isFollowed, setIsFollowed] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const [showFollowers, setShowFollowers] = useState(false)
    const [showFollowings, setShowFollowings] = useState(false)

    const handleCloseFollowers = () => {
      setShowFollowers(false);
    };

    const handleCloseFollowings= () => {
      setShowFollowings(false);
    };



    const followHandler = () => {
      sendFollow(setIsFollowed, profileId)
      // getIsFollowed(true)
    }
    const unfollowHandler = () => {
        sendUnfollow(setIsFollowed, profileId)
        // getIsFollowed(false)
    }


    // // 해당 프로필 유저의 팔로워들 중에서 currentUser의 id가 있으면 unfollow 버튼을 만들어주고 없으면 팔로우 버튼을 보여줌.
    useEffect(() => {
      fetchFollowCnt(setFollowCnt, profileId);
      fetchFollowers(setFollowers, profileId);
      fetchFollowees(setFollowees, profileId);
      fetchFollowOrNot(setIsFollowed, profileId, currentUser.id);
      // if ( followers.find(follower=>follower.followerId === currentUser.id)) {setIsFollowed(true)}
      setIsLoading(false);
    }, [ profileId, isFollowed, currentUser])
  



    // !!!!!!!!!!!!!!!!!! 팔로워 숫자 누르면 모달로 리스트 띄우는거 만들기!!!!!!
    // !!!!!!!!!! 언팔로우 버튼 회색으로 만들기 -> MUI 버튼 컬러설정 palette로
    return (
      <>
          { isLoading ?  <CircularProgress />: 
            <div>
              {!isCurrentUser && <div>
                {
                  isFollowed
                  ? <Button onClick={unfollowHandler} variant="contained" 
                  size="small" fullWidth className={classes.unfollow} color="primary"
                  sx={{borderRadius: '25px', letterSpacing: 3 }}>언팔로우</Button>
              
                  : <Button onClick={followHandler} variant="contained" 
                      size="small" fullWidth color="secondary"
                      sx={{borderRadius: '25px', letterSpacing: 3 }}>팔로우</Button>
                }
              </div>}
              <div className={classes.follow}>
                <Group sx={{  fontSize: 27, mx: 2, color: '#B8C5D0'}} />
                <div className={classes.followCnt}>
                  <span className={classes.follow_greys} onClick={() => setShowFollowers(true)}>팔로워 </span>
                  <span className={classes.cnt} >{followCnt.followerCnt} </span>
                  <span className={classes.follow_greys} onClick={() => setShowFollowings(true)}> 팔로잉 </span>
                  <span className={classes.cnt}>{followCnt.followeeCnt} </span>
                </div>

                <Dialog open={showFollowers} onClose={handleCloseFollowers}>
                  <DialogTitle>팔로워</DialogTitle>
                  <List sx={{ pt: 0 }}>
                    {followers.map(follower=>(
                      <ListItem button key={follower.id} onClick={() => {
                        setShowFollowers(false)
                        history.push(`/profile/${follower.followerId}`)}} >
                        <ListItemAvatar>
                          <Avatar sx={{ width: 50, height: 50 }} src={API_URL + `image/profile/${follower.followerId}.jpg`} />    
                          {/* <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}  src={profileImg}/> */}
                        </ListItemAvatar>
                        <ListItemText primary={follower.name} />
                      </ListItem>
                    ))}
                  </List>
                </Dialog> 

                <Dialog open={showFollowings} onClose={handleCloseFollowings}>
                  <DialogTitle>팔로잉</DialogTitle>
                    <List sx={{ pt: 0 }}>
                      {followees.map(followee=>(
                        <ListItem button key={followee.id} onClick={() => {
                          setShowFollowings(false)
                          history.push(`/profile/${followee.followeeId}`)}} >
                          <ListItemAvatar>
                            <Avatar sx={{ width: 50, height: 50 }} src={API_URL + `image/profile/${followee.followeeId}.jpg`} />    
                            {/* <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}  src={profileImg}/> */}
                          </ListItemAvatar>
                          <ListItemText primary={followee.name} />
                        </ListItem>
                      ))}
                    </List>
                </Dialog>
              </div>
            </div>}
        </>
    )
  }



export default Follow;