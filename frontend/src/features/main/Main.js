import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useLocation } from 'react-router-dom';
import Header from '../../common/UI/Header/Header';

import { getUser, logout } from '../auth/authSlice';
import EvaluationTemplate from '../matching/youlangmeCustom/evaluations/EvaluationTemplate';

import UserInfo from '../profile/LeftProfile/UserInfo/UserInfo';

// maintmp 파일
// custom component
import FeedLIst from './feed/FeedList';
import UserRanking from './ranking/UserRanking';
import RecommendUser from './recommendUser/RecommendUser';
import LanguageRanking from './ranking/LanguageRanking';
// external component

// css
import classes from './Main.module.scss';
import axios from 'axios';
import { API_URL } from '../../common/api/http-config';

const Main = (props) => {
  const location = useLocation();
  // 로컬스토리지 참조로 바꿔서 로컬스토리지의 currentUser가 null이 아니고, currentUser의 name이 nulll 이 아닐때만 main이 보이도록 바꿈
  // 위 두 조건 충족 못하면 modify로
  // const { currentUser } = useSelector((state) => state.auth);
  const currentUser = localStorage.getItem('currentUser');

  const chattingExit = location.state
    ? location.state.props.chattingExit
    : false;
  const [isEvaluationModalVisible, setIsEvaluationModalVisble] =
    useState(chattingExit);

  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();
  const history = useHistory();

  const logoutHandler = () => {
    dispatch(logout())
      .unwrap()
      .then((response) => {
        history.push('/');
      });
  };
  useEffect(() => {
    dispatch(getUser());
  }, []);

  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("user"));
    let accessToken = user ? user.accessToken : null;
    axios.get(API_URL + 'user/login-user', {
      headers: { "X-Auth-Token": accessToken },
    })
      .then((res) => {if(res.data.data.name){
        setIsLoading(false)
        history.push('/main')
      }else{history.push('/modify')}})
  }, [])

  const toggleEvaluationModal = (event) => {
    setIsEvaluationModalVisble(!isEvaluationModalVisible);
  };

  // if (currentUser.name === null) {
  // if (currentUser === null || currentUser.name === null) {
  //   history.push('/modify');
  // } else {
  //   // console.log(
  //   //   currentUser,
  //   //   currentUser.name,
  //   //   localStorage.getItem('currentUser')
  //   // );
  //   // 무한렌더링 되어버림
  //   // setIsLoading(false);
  // }
  return (
    <>
      {isEvaluationModalVisible && (
        <EvaluationTemplate toggleModal={toggleEvaluationModal} />
      )}
      {!isLoading && currentUser !== null && currentUser.name !== null && (
        <div>
          <div className={classes.main_container}>
            <div className={classes['feed-container']}>
              <FeedLIst />
            </div>

            <div className={classes['userRanking-container']}>
              <UserRanking />
            </div>

            <div className={classes['languageRanking-container']}>
              <LanguageRanking />
            </div>
            <div className={classes['followRecommand-container']}>
              <RecommendUser />
            </div>
          </div>
          <div className={classes.footer}></div>
        </div>
      )}
    </>
  );
};

export default Main;
