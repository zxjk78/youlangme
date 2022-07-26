// // component

import * as React from 'react';


//material UI
import { Avatar, Chip, Stack, Badge, Card, CardMedia, CardContent, Typography
  , Button  } from '@mui/material';
import { styled } from '@mui/material/styles';
import { green, blue, yellow, purple, deepOrange, red } from '@mui/material/colors';
import { CompareArrows, GTranslate, Group } from '@mui/icons-material';

// component 
import ProfileImageEdit from './ProfileImageEdit'

import KoreaFlag from './images/KoreaFlag.png'


// 리덕스 안거치는 단순 서버 통신 API
import { fetchProfile, fetchDescription, fetchProfileImg } from './ProfileAPI';
import { fetchFollow } from './FollowAPI';

// state
import { useState, useRef, useEffect } from 'react';

// redux
import { useSelector, useDispatch } from 'react-redux';

// router
import { useParams } from 'react-router-dom';

// css
import classes from './MyPage.module.scss';





const MyPage = () => {
  const params = useParams();
  const [profileInfo, setProfileInfo] = useState(null);
  const [profileImg, setProfileImg] = useState(null);
  const [profileDescription, setProfileDescription] = useState('');
  const [followCnt, setFollowCnt] = useState({
    followerCnt: 0, followeeCnt: 0
  });
  // console.log(params.userId);

  // redux
  const { currentUser } = useSelector((state) => state.auth);
  // const dispatch = useDispatch();
  console.log('리덕스 테스트:', currentUser );

  
  const isCurrentUser = currentUser.id === Number(params.userId);
  // console.log(isCurrentUser);

  useEffect(() => {
    fetchProfile(setProfileInfo, params.userId);
    fetchProfileImg(setProfileImg, params.userId);
    fetchDescription(setProfileDescription, params.userId);
    fetchFollow(setFollowCnt, params.userId);
  }, []);


  
  const colors = [ "primary", "secondary", "success", "info", "error", "warning" ]
  // const colors = [ green[400], blue[200], yellow[300], yellow[800], purple[300], purple[600], deepOrange[600], red[300]  ]
  // const chosenColor = colors[Math.floor(Math.random()*colors.length)]

  // flag 이모티곤 나중에 설정 하기
  // const flag = profileInfo.nationality === 'KOREA' ? KoreaFlag :  KoreaFlag;

  
  // // 의존성에 fetchProfile 추가하면 fetchProfile에 useCallback 함수로.


  // 팔로우 되어있으면 true, 아니면 false인 isfollowed도 만들기
  const [isFollowed, setIsFollowed] = useState(false);

  const followHandler = () => {

  }

  return (
    <div>
      
      {profileInfo && <div> 국적: {profileInfo.nationality}</div>}
      {/* currentUser의 프로필페이지에서만 profileImageEdit 가능하게 */}
      <Card className={classes.card} >
        <div className={classes.left_profile}>
          <Typography sx={{ color: 'rgba(0, 0, 0, 0.6)', fontSize: 30, fontWeight: 'bold' }} className={classes.header}>My Page</Typography>
          <CardMedia className={classes.avatar}>
            <Badge
              badgeContent={
                <img className={classes.flag} alt="flag" src={KoreaFlag} /> 
              }
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              overlap="circular"
              >
              <Avatar sx={{ width: 200, height: 200 }} src={profileImg} />    
              { isCurrentUser && <ProfileImageEdit/>}
            </Badge>
          </CardMedia>
          
          <div className={classes.profile_content}>

            {profileInfo && <CardContent >
              <Typography className={classes.name} 
                sx={{ fontWeight: 'bold', letterSpacing: 3, fontSize: 26 }} 
                gutterBottom component="div">
                {profileInfo.name}
              </Typography>

              {/* follow 되어있으면 팔로우 취소도 만들기!!!! */}
              {!isCurrentUser && <Button onClick={followHandler} variant="contained" 
                size="small" fullWidth color="secondary"
                sx={{borderRadius: '25px', letterSpacing: 3 }}>팔로우</Button>}

              <div className={classes.follow}>
                <Group sx={{  fontSize: 27, mx: 2, color: '#B8C5D0'}} />
                <div className={classes.followCnt}>
                  <span className={classes.follow_greys}>팔로워 </span>
                  <span className={classes.cnt}>{followCnt.followerCnt} </span>
                  <span className={classes.follow_greys}> 팔로잉 </span>
                  <span className={classes.cnt}>{followCnt.followeeCnt} </span>
                </div>
                

              </div>
              
              <Card className={classes.description_card}>
                <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 'light' }}>
                  {profileDescription}
                </Typography>
              </Card>
              <Card className={classes.rest_info}>
                <div className={classes.languages}>
                  <GTranslate sx={{  fontSize: 20, mr: 2, color: '#B8C5D0'}} />
                  <div>
                    <span className={classes.language}>{profileInfo.mylanguage} </span>
                    <span className={classes.greys}>me</span>
                    <CompareArrows sx={{  fontSize: 20, mx: 1 }} />
                    <span className={classes.language}> {profileInfo.yourlanguage}</span>
                    <span className={classes.greys}> you</span>

                  </div>

                </div>
                <br />
                <div className={classes.favorite_chips}>
                  {profileInfo.favorites.map((fav) => {
                    return (
                      <Chip
                        key={profileInfo.favorites.indexOf(fav)}
                        label={fav} 
                        color={colors[Math.floor(Math.random()*colors.length)]}
                        className={classes.chip}
                      />
                    );
                  })}
                </div>

              </Card>

              

            </CardContent>}
          </div>
          
          <div></div>
    


        </div>
      </Card>
    </div>
  );
};

export default MyPage;

