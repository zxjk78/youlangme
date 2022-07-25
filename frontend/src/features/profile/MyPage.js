// // component
// import Button from '../../../common/UI/Button';

//material UI
import { Avatar, Chip } from '@mui/material';

// component 
import ProfileImageEdit from './ProfileImageEdit'


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
    setProfileImg(API_URL + `user/image/${params.userId}`)
  }, []);


  
  const colors = [ "primary", "secondary", "success", "info", "error", "warning" ]
  // const chosenColor = colors[Math.floor(Math.random()*colors.length)]

  
  // // 의존성에 fetchProfile 추가하면 fetchProfile에 useCallback 함수로.


  return (
    <div>
      <h1>My Page</h1>
      {/* currentUser의 프로필페이지에서만 profileImageEdit 가능하게 */}
      <ProfileImageEdit />
      
      <div>{profileImg && <Avatar sx={{ width: 200, height: 200 }} src={profileImg} alt="프로필 이미지" />}</div>
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
