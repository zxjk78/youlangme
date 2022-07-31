import * as React from 'react';
// state
import { useState, useRef, useEffect, useCallback } from 'react';

// redux
import { useSelector, useDispatch } from 'react-redux';
import { modalActions } from '../../common/UI/Modal/modalSlice';

// router
import { useHistory, useParams } from 'react-router-dom';

// 리덕스 안거치는 단순 서버 통신 API
import { fetchProfile, fetchDescription, fetchProfileImg } from './ProfileAPI';

// component
import ProfileImageEdit from './ProfileImageEdit';
import ProfileDescEdit from './ProfileDescEdit';
import Follow from './Follow/Follow';
import Modal from '../../common/UI/Modal/Modal';
import ModifyUserInfo from '../auth/modify/ModifyUserInfo';

// data import
import * as data from '../auth/modify/data';
import { iso_code } from './UserInfo/flagData'


// css
import classes from './MyPage.module.scss';

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
  Button
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  green,
  blue,
  yellow,
  purple,
  deepOrange,
  red,
} from '@mui/material/colors';
import { CompareArrows, GTranslate } from '@mui/icons-material';

// image
// import KoreaFlag from './images/KoreaFlag.png';

const MyPage = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  
    // redux
    const { currentUser } = useSelector((state) => state.auth);
    // const dispatch = useDispatch();
    // console.log('리덕스 테스트:', currentUser );

  const [profileInfo, setProfileInfo] = useState(null);
  const [profileImg, setProfileImg] = useState(null);
  const [profileDescription, setProfileDescription] = useState('');
  const [isUploaded, setIsUploaded] = useState(false)
  const [isLoading, setIsLoading] = useState(true);
  const isModalVisible = useSelector((state) => state.modal.isVisible);
  // console.log(params.userId);
  
  const nationalityCode = profileInfo ? iso_code[profileInfo.nationality] : null
  const isCurrentUser = currentUser.id === Number(params.userId);
  // console.log(isCurrentUser);


  const modifyModalHandler = () => {
    dispatch(modalActions.onModal());
  };

  const updateProfileImg = (isUpdated) => {
      console.log(isUpdated, '이미지 업데이트여부')
      if (isUpdated) {
        setIsUploaded(true)
      }
    }
  const updateProfileDesc = (isUpdated) => {
    console.log(isUpdated, '자기소개 업데이트여부')
    if (isUpdated) {
      setIsUploaded(true)
    }
  }


  useEffect(() => {
    (
      async () => {
        const profileDetail = await fetchProfile(params.userId);
        if (!profileDetail) {
          history.replace({
            pathname: '/404',
            message: '존재하지 않는 게시물입니다.',
          });
        }
        const profileImage = await fetchProfileImg(params.userId);
        const profileDescript = await fetchDescription(params.userId);

        setProfileInfo(profileDetail);
        setProfileImg(profileImage)
        setProfileDescription(profileDescript)
        setIsLoading(false);
        setIsUploaded(false)
        console.log(params.userId)
        console.log( '바뀌지마!!!!!!', profileDescript, profileDescription)

      })();
    return () => {
      setProfileImg(null)
    }
  }, [params.userId, isUploaded, profileDescription]);


  const colors = [
    'primary',
    'secondary',
    'success',
    'info',
    'error',
    'warning',
  ];
  // const colors = [ green[400], blue[200], yellow[300], yellow[800], purple[300], purple[600], deepOrange[600], red[300]  ]
  // const chosenColor = colors[Math.floor(Math.random()*colors.length)]

  // flag 이모티곤 나중에 설정 하기
  // const flag = profileInfo.nationality === 'KOREA' ? KoreaFlag :  KoreaFlag;

  // // 의존성에 fetchProfile 추가하면 fetchProfile에 useCallback 함수로.

  return (
    <>
      {isLoading ? <CircularProgress /> : <div>
        {profileInfo && isModalVisible && (
          <Modal>
            <ModifyUserInfo userInfo={profileInfo} />
          </Modal>
        )}
        <Card className={classes.card}>
          <div className={classes.left_profile}>
            <Typography
              sx={{
                color: 'rgba(0, 0, 0, 0.6)',
                fontSize: 30,
                fontWeight: 'bold',
              }}
              className={classes.header}
            >
              My Page
            </Typography>
            <CardMedia className={classes.avatar}>
              <Badge
                badgeContent={
                  <img className={classes.flag} alt="flag" src={`http://www.geonames.org/flags/x/${nationalityCode}.gif`} />
                }
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                overlap="circular"
              >
                <Avatar sx={{ width: 200, height: 200 }} src={profileImg} />
                {isCurrentUser && <ProfileImageEdit getNewProfileImg={updateProfileImg}/>}
              </Badge>
            </CardMedia>

            <div className={classes.profile_content}>
              {profileInfo && (
                <CardContent>
                  <Typography
                    className={classes.name}
                    sx={{ fontWeight: 'bold', letterSpacing: 3, fontSize: 26 }}
                    gutterBottom
                    component="div"
                  >
                    {profileInfo.name}
                    <Button onClick={modifyModalHandler} size='small'>프로필 수정</Button>
                  </Typography>
                  <Follow profileUserId={params.userId} />

                  <Card className={classes.description_card}>
                    <div>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ fontWeight: 'light' }}
                      >
                        {profileDescription}
                      </Typography>
                    </div>
                    {isCurrentUser && <div className={classes.modify_discript}>
                      <ProfileDescEdit desc={profileDescription} getNewProfileDesc={updateProfileDesc}/>
                    </div>}
                  </Card>
                  <Card className={classes.rest_info}>
                    <div className={classes.languages}>
                      <GTranslate
                        sx={{ fontSize: 18, mr: 2, color: '#B8C5D0' }}
                      />
                      <div>
                        <span className={classes.language}>
                          {profileInfo.mylanguage}{' '}
                        </span>
                        <span className={classes.greys}>me</span>
                        <CompareArrows sx={{ fontSize: 18, mx: 1 }} />
                        <span className={classes.language}>
                          {profileInfo.yourlanguage}
                        </span>
                        <span className={classes.greys}> you</span>
                      </div>
                    </div>
                    {/* <br /> */}
                    <div className={classes.favorite_chips}>
                      {profileInfo.favorites.map((fav) => {
                        return (
                          <Chip
                            key={fav}
                            label={data.favorites[fav]}
                            color={
                              colors[Math.floor(Math.random() * colors.length)]
                            }
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
        </Card>
      </div>}
    </>

  );
};

export default MyPage;
