import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import axios from 'axios';
import {
  fetchProfile,
  fetchProfileImg,
} from '../../profile/LeftProfile/LeftProfileAPI';

// data import
import { API_URL, accessToken } from '../../../common/api/http-config';
import { iso_code } from '../../profile/LeftProfile/UserInfo/flagData';

// mui
import { Avatar, Badge, Button, CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';

// css
import classes from './StartMatch.module.scss';
import { grey } from '@mui/material/colors';

const ColorButton = styled(Button)(({ theme }) => ({
  // color: theme.palette.getContrastText(yellow[500]),
  fontSize: 30,
  fontWeight: 1000,
  lineHeight: 1.5,
  padding: '20px 20px',
  margin: '30px 0px 20px 0px',
  width: 380,

  border: '1px solid #CAD6E2',
  borderRadius: 20,
  backgroundColor: '#B865C6',
  '&:hover': {
    backgroundColor: '#EC7EFF',
  },
}));

const ConfirmChat = (props) => {
  const history = useHistory();
  const currentUser = useSelector((state) => state.auth.currentUser);
  const [myInfo, setMyInfo] = useState(null);
  const [youInfo, setYouInfo] = useState(null);
  const [myImage, setMyImage] = useState(null);
  const [yourImage, setYourImage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (props.matchConfirm) {
      setTimeout(() => {
        props.setOpponentId(null);
        props.setSessionId('');
        props.setMyData(null);
        props.setYourData(null);
        props.setMyProfile(null);
        props.setYourProfile(null);
        props.setMatchConfirm(false);
      }, 25000);
    }
    return () => {
      setMyInfo(null);
      setMyImage(null);
      setYouInfo(null);
      setYourImage(null);
    };
  }, [props.matchConfirm]);

  const matchingHandler = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const accessToken = user ? user.accessToken : null;

    axios
      .post(
        API_URL + `meeting/enter/${props.sessionId}`,
        { 'yourLanguage': props.yourlanguage },
        {
          headers: {
            'Content-Type': 'application/json',
            'X-AUTH-TOKEN': accessToken,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        history.push({
          pathname: '/match',
          state: {
            sessionId: props.sessionId,
            myUserId: currentUser.id,
            yourUserId: props.opponentId,
            myInfo: myInfo,
            youInfo: youInfo,
            myLanguage: props.myLanguage,
            yourLanguage: props.yourLanguage,
          },
        });
      })
      .catch((err) => console.log(err.message));
  };

  useEffect(() => {
    (async () => {
      if (props.matchConfirm) {
        setIsLoading(true);
        const data = await fetchProfile(currentUser.id);
        if (!data) {
          history.replace({
            pathname: '/404',
            message: '존재하지 않는 게시물입니다.',
          });
        }
        const dataImage = await fetchProfileImg(currentUser.id);
        setMyInfo(data);
        setMyImage(dataImage);
        props.setMyData(data);
        props.setMyProfile(dataImage);
        setIsLoading(false);
      }
    })();
  }, [props.matchConfirm, currentUser]);

  useEffect(() => {
    (async () => {
      if (props.matchConfirm) {
        setIsLoading(true);
        const data1 = await fetchProfile(props.opponentId);
        const data1Image = await fetchProfileImg(props.opponentId);
        setYouInfo(data1);
        setYourImage(data1Image);
        props.setYourData(data1);
        props.setYourProfile(data1Image);
        setIsLoading(false);
      }
    })();
  }, [props.matchConfirm, props.opponentId]);

  const myNationalityCode = myInfo ? iso_code[myInfo.nationality] : null;
  const yourNationalityCode = youInfo ? iso_code[youInfo.nationality] : null;
  // console.log(myNationalityCode, yourNationalityCode);

  return (
    <>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <div className={classes.match_wrapper}>
          <div className={classes.confirm_ment}>매칭 성공!</div>
          <div className={classes.matching_pair}>
            {myInfo && myImage && (
              <div className={classes.match_user}>
                <Badge
                  badgeContent={
                    <img
                      className={classes.flag}
                      alt="flag"
                      src={`http://www.geonames.org/flags/x/${myNationalityCode}.gif`}
                    />
                  }
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                  overlap="circular"
                >
                  <Avatar sx={{ width: 250, height: 250 }} src={myImage} />
                </Badge>
                <div className={classes.match_user_name}>{myInfo.name}</div>
              </div>
            )}

            {youInfo && yourImage && (
              <div className={classes.match_user}>
                <Badge
                  badgeContent={
                    <img
                      className={classes.flag}
                      alt="flag"
                      src={`http://www.geonames.org/flags/x/${yourNationalityCode}.gif`}
                    />
                  }
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                  overlap="circular"
                >
                  <Avatar sx={{ width: 250, height: 250 }} src={yourImage} />
                </Badge>
                <div className={classes.match_user_name}>{youInfo.name}</div>
              </div>
            )}
          </div>
          {myInfo && youInfo && (
            <div className={classes.match_success_lngs}>
              <div
                className={`${classes.match_success_each_lng} ${classes.custom_text_grey}`}
              >
                {props.myLanguage}
              </div>
              <SwapHorizIcon sx={{ fontSize: 40, mx: 3, mt: '1px' }} />
              <div
                className={`${classes.match_success_each_lng} ${classes.custom_text_yellow}`}
              >
                {props.yourLanguage}
              </div>
            </div>
          )}

          <ColorButton
            variant="contained"
            sx={{ mt: 3 }}
            onClick={matchingHandler}
          >
            입장하기
          </ColorButton>
        </div>
      )}
    </>
  );
};

export default ConfirmChat;
