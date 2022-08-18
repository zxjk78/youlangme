import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useLocation } from 'react-router-dom';
import Header from '../../common/UI/Header/Header';

import { getUser, logout } from '../auth/authSlice';
import EvaluationTemplate from '../matching/youlangmeCustom/evaluations/EvaluationTemplate';

import UserInfo from '../profile/LeftProfile/UserInfo/UserInfo';

// custom component
import FeedLIst from './feed/FeedList';
import UserRanking from './ranking/UserRanking';
import RecommendUser from './recommendUser/RecommendUser';
import LanguageRanking from './ranking/LanguageRanking';
// external component

// css
import classes from './Main.module.scss';

const Main = (props) => {
  const location = useLocation();
  const { currentUser } = useSelector((state) => state.auth);
  const chattingExit = location.state
    ? location.state.props.chattingExit
    : false;
  const [isEvaluationModalVisible, setIsEvaluationModalVisble] =
    useState(chattingExit);
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

  const toggleEvaluationModal = (event) => {
    setIsEvaluationModalVisble(!isEvaluationModalVisible);
  };

  // console.log(currentUser.name);
  if (currentUser.name === null) {
    history.push('/modify');
  }
  // const { user } = useSelector((state) => state.auth);
  // console.log(user);
  return (
    <>
      {isEvaluationModalVisible && (
        <EvaluationTemplate toggleModal={toggleEvaluationModal} />
      )}

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
    </>
  );
};

export default Main;
