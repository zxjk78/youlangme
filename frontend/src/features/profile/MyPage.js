// // component
// import Button from '../../../common/UI/Button';
import * as React from 'react';


//material UI
import { Avatar, Chip, Stack, Badge  } from '@mui/material';
import { styled } from '@mui/material/styles';

// component 
import ProfileImageEdit from './ProfileImageEdit'

import KoreaFlag from './images/KoreaFlag.png'


// 리덕스 안거치는 단순 서버 통신 API
import { fetchProfile, fetchDescription, fetchProfileImg } from './ProfileAPI';

// state
import { useState, useRef, useEffect } from 'react';

// redux
import { useSelector, useDispatch } from 'react-redux';

// router
import { useParams } from 'react-router-dom';

// css
import classes from './MyPage.module.scss';



// const StyledBadge = styled(Badge)(({ theme }) => ({
//   '& .MuiBadge-badge': {
//     backgroundColor: '#44b700',
//     color: '#44b700',
//     boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
//     '&::after': {
//       position: 'absolute',
//       top: 0,
//       left: 0,
//       width: '100%',
//       height: '100%',
//       borderRadius: '50%',
//       animation: 'ripple 1.2s infinite ease-in-out',
//       border: '1px solid currentColor',
//       content: '""',
//     },
//   },
//   '@keyframes ripple': {
//     '0%': {
//       transform: 'scale(.8)',
//       opacity: 1,
//     },
//     '100%': {
//       transform: 'scale(2.4)',
//       opacity: 0,
//     },
//   },
// }));





const MyPage = () => {
  const API_URL = 'http://127.0.0.1:8080/';
  const params = useParams();
  const [profileInfo, setProfileInfo] = useState(null);
  const [profileImg, setProfileImg] = useState(null);
  const [profileDescription, setProfileDescription] = useState('');
  // console.log(params.userId);

  useEffect(() => {
    fetchProfile(setProfileInfo, params.userId);
    // fetchProfileImg(setProfileImg, params.userId);
    fetchDescription(setProfileDescription, params.userId);
    setProfileImg(API_URL + `image/profile/${params.userId}.jpg`)
  }, []);


  
  const colors = [ "primary", "secondary", "success", "info", "error", "warning" ]
  // const chosenColor = colors[Math.floor(Math.random()*colors.length)]

  // flag 이모티곤 나중에 설정 하기
  // const flag = profileInfo.nationality === 'KOREA' ? KoreaFlag :  KoreaFlag;

  
  // // 의존성에 fetchProfile 추가하면 fetchProfile에 useCallback 함수로.


  return (
    <div>
      <h1>My Page</h1>
      {/* currentUser의 프로필페이지에서만 profileImageEdit 가능하게 */}
      <ProfileImageEdit />
      
      <div>
        <Badge
          badgeContent={
            <img className={classes.flag} alt="flag" src={KoreaFlag} /> 
          }
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          overlap="circular"
        >
          <Avatar sx={{ width: 200, height: 200 }} src={profileImg} />    
        </Badge>

      </div>

      {profileInfo && 
        <div>
          <h2>{profileInfo.name}</h2>
          <h4>{profileInfo.nationality}</h4>
          <p>{profileDescription}</p>
          <br />
          <p>me:  {profileInfo.mylanguage}</p>
          <p>you:  {profileInfo.yourlanguage}</p>
          <div>
            {profileInfo.favorites.map((fav) => {
              return (
                <Chip
                  key={profileInfo.favorites.indexOf(fav)}
                  label={fav} 
                  color={colors[Math.floor(Math.random()*colors.length)]}
                />
              );
            })}
          </div>
        </div>
      }
    </div>
  );
};

export default MyPage;
