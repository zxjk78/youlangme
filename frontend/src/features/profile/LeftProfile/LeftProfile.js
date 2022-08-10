import * as React from 'react';
// state
import { useState, useRef, useEffect, useCallback } from 'react';

// redux
import { useSelector, useDispatch } from 'react-redux';
import { modalActions } from '../../../common/UI/Modal/modalSlice';
import { profileActions } from '../profileSlice';

// router
import { useHistory } from 'react-router-dom';

// 리덕스 안거치는 단순 서버 통신 API
import { fetchProfile, fetchDescription, fetchProfileImg } from './LeftProfileAPI';

// component
import ProfileImageEdit from './ProfileImageEdit';
import ProfileDescEdit from './ProfileDescEdit';
import Follow from './Follow/Follow';
import Modal from '../../../common/UI/Modal/Modal';
import ModifyUserInfo from '../../auth/modify/ModifyUserInfo';

// data import
import * as data from '../../auth/modify/data';
import { iso_code } from './UserInfo/flagData'
import { chipColors } from '../ProfileColorPalette'

// css
import classes from './LeftProfile.module.scss';

//material UI
import {
  Avatar,
  Chip,
  Stack,
  Badge,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CircularProgress,
  Button,
  IconButton
} from '@mui/material';
import {  createTheme, ThemeProvider, styled } from '@mui/material/styles';
import { amber, blue, deepOrange, deepPurple, green, indigo, lightBlue, lime, orange, pink, 
  grey, purple, red, teal, yellow } from '@mui/material/colors';
import { CompareArrows, GTranslate, Build} from '@mui/icons-material';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';

// image
// import KoreaFlag from './images/KoreaFlag.png';



const LeftProfile = (props) => {
  const userId = props.userId
  const history = useHistory();
  // const params = useParams();
  
  const myTheme = createTheme({
    palette: chipColors
  });
  
  // redux
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.auth);
  const { isProfileImgUpdated }  = useSelector((state) => state.profile);
    // const dispatch = useDispatch();
    // console.log('리덕스 테스트:', currentUser );

  const [profileInfo, setProfileInfo] = useState(null);
  const [otherProfileImg, setOtherProfileImg] = useState(null);
  const [myProfileImg, setMyProfileImg] = useState(null);

  const [profileDescription, setProfileDescription] = useState('');
  const [isDescUploaded, setIsDescUploaded] = useState(false)
  const [isLoading, setIsLoading] = useState(true);
  const isModalVisible = useSelector((state) => state.modal.isVisible);
  // console.log(userId);
  
  const nationalityCode = profileInfo ? iso_code[profileInfo.nationality] : null


  const isCurrentUser = currentUser.id === Number(userId);
  // console.log(isCurrentUser);


  const modifyModalHandler = () => {
    dispatch(modalActions.onModal());
  };

  // const updateProfileImg = (isUpdated) => {
  //   // console.log(isUpdated, '이미지 업데이트여부')
  //   if (isUpdated) {
  //     dispatch(profileActions.profileImgUpdate(true));
  //     console.log('지금 이미지 상태',isprofileImgUploaded)
  //   }
  // }


  const updateProfileDesc = (isUpdated) => {
    console.log(isUpdated, '자기소개 업데이트여부')
    if (isUpdated) {
      setIsDescUploaded(true)
    } 
  }
  
  
  useEffect(() => {
    (
      async () => {
        const profileDetail = await fetchProfile(userId);
        if (!profileDetail) {
          history.replace({
            pathname: '/404',
            message: '존재하지 않는 게시물입니다.',
          });
        }
        const profileImage = await fetchProfileImg(userId);
        const profileDescript = await fetchDescription(userId);
        
        setProfileInfo(profileDetail);
        setProfileDescription(profileDescript)

        if (isCurrentUser) {
          setMyProfileImg(profileImage)
        } else {
          setOtherProfileImg(profileImage)
        }

        setIsLoading(false);
        setIsDescUploaded(false)
        dispatch(profileActions.resetProfileImgUpdate());
      })();
      
      return () => {
        if (isCurrentUser) {
        setMyProfileImg(null)
      } else {
        setOtherProfileImg(null)
      }
    }
  }, [userId, isDescUploaded, isProfileImgUpdated, profileDescription]);

  // const colors = [ 'red', 'pink', 'purple', 'deepPurple', 'indigo', 'blue', 'lightBlue', 
  // 'teal', 'green', 'lime', 'yellow', 'amber', 'orange', 'deepOrange']
  const colors = [ 'primary', 'secondary', 'warning', 'success', 'info', 'error']

  // // 의존성에 fetchProfile 추가하면 fetchProfile에 useCallback 함수로.

  return (
    <ThemeProvider theme={myTheme}>
      {isLoading ? <CircularProgress /> : 
      <div className={classes.left_profile}>
        {profileInfo && isModalVisible && (
          <Modal>
            <ModifyUserInfo userInfo={profileInfo} />
          </Modal>
        )}
        <div>
          {/* <Typography
            sx={{
              color: 'rgba(0, 0, 0, 0.6)',
              fontSize: 35,
              fontWeight: 'bold',
              mb:3
            }}
            className={classes.header}
          >
            {profileInfo.name}
          </Typography> */}
          <CardMedia className={classes.avatar}>
            <div className={classes.profile_img_add_icon}>
              {isCurrentUser && <ProfileImageEdit 
              // getNewProfileImg={updateProfileImg}
              />}      
            </div>
            <Badge
              badgeContent={
                <img className={classes.flag} alt="flag" 
                src={`http://www.geonames.org/flags/x/${nationalityCode}.gif`} />
              }
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              overlap="circular"
            >
              <Avatar sx={{ width: 200, height: 200 }} 
                src={isCurrentUser ? myProfileImg : otherProfileImg} />
            </Badge>
          
          </CardMedia>

          <div className={classes.profile_content}>
            {profileInfo && (
              <CardContent>
                <Typography
                  className={classes.name}
                  sx={{ fontWeight: 'bold', letterSpacing: 3, fontSize: 30 }}
                  gutterBottom
                  component="div"
                >
                  {profileInfo.name}
                  { isCurrentUser && <IconButton onClick={modifyModalHandler} sx={{ width: '35px', height: '35px'}}>
                  <Build
                      sx={{ fontSize: 20, color: grey[500] }}
                    /></IconButton>}
                </Typography>
                <Follow profileUserId={userId} />

                <Card className={classes.description_card}>
                  {isCurrentUser && <div className={classes.modify_discript}>
                    <ProfileDescEdit desc={profileDescription} getNewProfileDesc={updateProfileDesc}/>
                  </div>}
                  <div className={classes.description_card_content}>
                    <Typography
                      variant="body1"
                      color="text.secondary"
                      sx={{ fontWeight: 'light', fontSize: 15 }}
                    >
                      {profileDescription}
                    </Typography>
                  </div>
                </Card>
                <Card className={classes.rest_info}>
                  <div className={classes.languages}>
                    <GTranslate
                      sx={{ fontSize: 18, mr: 2, color: grey[500] }}
                    />
                    <div>
                      <span className={classes.language}>
                        {profileInfo.mylanguage}{' '}
                      </span>
                      <span className={classes.greys}>me</span>
                      <SwapHorizIcon sx={{ fontSize: 18, mx: 1 }} />
                      <span className={classes.language}>
                        {profileInfo.yourlanguage}{' '}
                      </span>
                      <span className={classes.greys}>you</span>
                    </div>
                  </div>
                  {/* <br /> */}
                  <div className={classes.favorite_chips}>
                    {profileInfo.favorites.map((fav) => {
                      return (
                        <Chip
                          key={fav}
                          label={data.favorites[fav]}
                          color =
                          { colors[Math.floor(Math.random() * colors.length)]}
                          sx={{ color:'#F9F3EE', fontWeight: 'bold'  }}
                          className={classes.chip}
                        />
                      );
                    })}
                  </div>
                </Card>
              </CardContent>
            )}
          </div>
        </div>
      </div>}
    </ThemeProvider>
  );
};

export default LeftProfile;
