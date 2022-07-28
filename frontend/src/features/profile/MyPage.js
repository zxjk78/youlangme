import * as React from 'react';

// component
import ProfileImageEdit from './ProfileImageEdit';
import Follow from './Follow/Follow';
import Modal from '../../common/UI/Modal/Modal';
import ModifyUserInfo from '../auth/modify/ModifyUserInfo';

// 리덕스 안거치는 단순 서버 통신 API
import { fetchProfile, fetchDescription, fetchProfileImg } from './ProfileAPI';
import { fetchFollow } from './Follow/FollowAPI';

// state
import { useState, useRef, useEffect } from 'react';

// redux
import { useSelector, useDispatch } from 'react-redux';
import { modalActions } from '../../common/UI/Modal/modalSlice';
// router
import { useParams } from 'react-router-dom';

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
import KoreaFlag from './images/KoreaFlag.png';

const MyPage = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const [profileInfo, setProfileInfo] = useState(null);
  const [profileImg, setProfileImg] = useState(null);
  const [profileDescription, setProfileDescription] = useState('');
  const isModalVisible = useSelector((state) => state.modal.isVisible);
  // console.log(params.userId);

  // redux
  const { currentUser } = useSelector((state) => state.auth);
  // const dispatch = useDispatch();
  // console.log('리덕스 테스트:', currentUser );

  const isCurrentUser = currentUser.id === Number(params.userId);
  // console.log(isCurrentUser);

  const modifyModalHandler = () => {
    dispatch(modalActions.onModal());
  };

  useEffect(() => {
    fetchProfile(setProfileInfo, params.userId);
    fetchProfileImg(setProfileImg, params.userId);
    fetchDescription(setProfileDescription, params.userId);
  }, [params.userId]);

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
    <div>
      {profileInfo && isModalVisible && (
        <Modal>
          <ModifyUserInfo userInfo={profileInfo} />
        </Modal>
      )}
      {profileInfo && <div> 국적: {profileInfo.nationality}</div>}
      {/* currentUser의 프로필페이지에서만 profileImageEdit 가능하게 */}
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
                <img className={classes.flag} alt="flag" src={KoreaFlag} />
              }
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              overlap="circular"
            >
              <Avatar sx={{ width: 200, height: 200 }} src={profileImg} />
              {isCurrentUser && <ProfileImageEdit />}
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
                  <button onClick={modifyModalHandler}>유저정보 수정</button>
                </Typography>
                <Follow profileUserId={params.userId} />

                <Card className={classes.description_card}>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ fontWeight: 'light' }}
                  >
                    {profileDescription}
                  </Typography>
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
                  <br />
                  <div className={classes.favorite_chips}>
                    {profileInfo.favorites.map((fav) => {
                      return (
                        <Chip
                          key={profileInfo.favorites.indexOf(fav)}
                          label={fav} // 이부분 취미를 변경해달라고 요청
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

          <div></div>
        </div>
      </Card>
    </div>
  );
};

export default MyPage;
