
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from "react-router-dom";
// component
// import Followers from './Followers';
// import Followings from './Followings';

// 리덕스 안거치는 단순 서버 통신 API
import { fetchFollowCnt, fetchFollowers, fetchFollowees, sendFollow, sendUnfollow, fetchFollowOrNot } from './FollowAPI';
import { API_URL } from '../../../../common/api/http-config';

// css
import classes from './Follow.module.scss';

// Mui
import { Avatar, Box, Button, CircularProgress, Dialog, DialogContent, DialogTitle, 
  List, ListItem, ListItemAvatar, ListItemText, Typography  } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { grey, purple } from '@mui/material/colors';
import { Group } from '@mui/icons-material';

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



    const followHandler = async () => {
      const getFollow = await sendFollow(profileId);
      setIsFollowed(getFollow)
      // getIsFollowed(true)
    }
    const unfollowHandler = async () => {
      const getUnfollow = await sendUnfollow(profileId);
      setIsFollowed(getUnfollow)
      
        // getIsFollowed(false)
    }

    // const style = {
    //   position: 'absolute',
    //   top: '50%', left: '50%',
    //   transform: 'translate(-50%, -50%)',
    //   width: 240,
    //   height: 350,
    //   fontWeight: 'bold',
    //   backgroundColor: 'background.paper',
    //   // border: '3px solid #9BA7AF',
    //   borderRadius: 5,
    //   boxShadow: 24,
    //   // px: 3, py: 2,
    // };
  


    // // 해당 프로필 유저의 팔로워들 중에서 currentUser의 id가 있으면 unfollow 버튼을 만들어주고 없으면 팔로우 버튼을 보여줌.
    useEffect(() => {
      (
        async () => {
          const getFollowCnt = await fetchFollowCnt(profileId);
          const getFollowers = await fetchFollowers(profileId);
          const getFollowees = await fetchFollowees( profileId);
          const getFollowOrNot = await fetchFollowOrNot(profileId, currentUser.id);
          setFollowCnt(getFollowCnt);
          setFollowers(getFollowers);
          setFollowees(getFollowees);
          setIsFollowed(getFollowOrNot);
          
          setIsLoading(false);
        })();
  
      return () => {
        setIsLoading(true)
      }
    }, [profileId, isFollowed, currentUser]);

  
    return (
      <ThemeProvider theme={myColorTheme}>
          { isLoading ?  <CircularProgress color='inherit'/>: 
            <div>
              {!isCurrentUser && <div className={classes.followBtn}>
                {
                  isFollowed
                  ? <Button onClick={unfollowHandler} variant="contained" 
                  size="small" fullWidth className={classes.unfollow} color="followBtnColor"
                  sx={{borderRadius: '25px', letterSpacing: 3, fontWeight: 'bold', color: '#FFFFFF' }}>팔로우 취소</Button>
              
                  : <Button onClick={followHandler} variant="contained" 
                      size="small" fullWidth color="unfollowBtnColor"
                      sx={{borderRadius: '25px', letterSpacing: 3, fontWeight: 'bold', color: '#FFFFFF' }}>팔로우</Button>
                }
              </div>}
              <div className={classes.follow}>
                <Group sx={{  fontSize: 23, mx: 2, color: grey[500]}} />
                <div className={classes.followCnt}>
                  <span className={classes.follow_greys} onClick={() => setShowFollowers(true)}>팔로워 </span>
                  <span className={classes.cnt} >{followCnt.followerCnt} </span>
                  <span className={classes.follow_greys} onClick={() => setShowFollowings(true)}> 팔로잉 </span>
                  <span className={classes.cnt}>{followCnt.followeeCnt} </span>
                </div>


                {/* dialog 대신에 mui popover  or popper사용해보기!!!!!! */}
                <Dialog open={showFollowers} onClose={handleCloseFollowers} 
                  >
                  <DialogTitle sx={{ fontSize: 28, fontWeight: 500, letterSpacing: 2, 
                    bgcolor:'#FFC700', color:'#F9F3EE' }}>
                    팔로워
                  </DialogTitle>
                  <DialogContent sx={{ width: 270, height: 300, px:2 }} >
                    <List sx={{ pt: 1 }}>
                      {followers.map(follower=>(
                        <ListItem button key={follower.id} onClick={() => {
                          setShowFollowers(false)
                          history.push(`/profile/${follower.followerId}`)}}
                          sx={{ px: 1}}>
                          <ListItemAvatar>
                            <Avatar sx={{ width: 50, height: 50,  mr: 2 }} src={API_URL + `image/profile/${follower.followerId}.jpg`} />    
                            {/* <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}  src={profileImg}/> */}
                          </ListItemAvatar>
                          <ListItemText>
                            <Typography  sx={{
                              fontSize: 16,
                              fontWeight: 'bold',
                              letterSpacing: 1,
                            }}
                            className={classes.header}>{follower.name}</Typography>
                          </ListItemText>
                        </ListItem>
                      ))}
                    </List>
                  </DialogContent>

                </Dialog> 

                <Dialog open={showFollowings} onClose={handleCloseFollowings}
                  >
                  <DialogTitle sx={{ fontSize: 28, fontWeight: 500, letterSpacing: 2,
                    bgcolor:'#FFC700', color:'#F9F3EE' }}>
                    팔로잉</DialogTitle>
                  <DialogContent sx={{ width: 270, height: 300, px:2 }} >
                    <List sx={{ pt: 1 }}>
                      {followees.map(followee=>(
                        <ListItem button key={followee.id} onClick={() => {
                          setShowFollowings(false)
                          history.push(`/profile/${followee.followeeId}`)}}
                          sx={{px: 1 }} >
                          <ListItemAvatar>
                            <Avatar sx={{ width: 50, height: 50, mr: 2 }} src={API_URL + `image/profile/${followee.followeeId}.jpg`} />    
                            {/* <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}  src={profileImg}/> */}
                          </ListItemAvatar>
                          <ListItemText>
                            <Typography  sx={{
                              fontSize: 16,
                              fontWeight: 'bold',
                              letterSpacing: 1,
                            }}
                            className={classes.header}>{followee.name}</Typography>
                          </ListItemText>
                        </ListItem>
                      ))}
                    </List>
                  </DialogContent>

                </Dialog>
              </div>
            </div>}
        </ThemeProvider>
    )
  }



export default Follow;