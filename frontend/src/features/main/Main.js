import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useLocation } from 'react-router-dom';
import Header from '../../common/UI/Header/Header';

import { getUser, logout } from '../auth/authSlice';
import EvaluationTemplate from '../matching/youlangmeCustom/evaluations/EvaluationTemplate';

import UserInfo from '../profile/LeftProfile/UserInfo/UserInfo';

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
    <div>
      {/* {currentUser.name && <Header/>} */}
      <h2>이곳은 임시 홈페이지</h2>

      {isEvaluationModalVisible && (
        <EvaluationTemplate toggleModal={toggleEvaluationModal} />
      )}
      {/* {true && <EvaluationTemplate toggleModal={toggleEvaluationModal} />} */}

      <div>
        <Link to="/board/create">게시판 생성작업</Link>
      </div>
      <div>
        <Link to="/test">메인페이지 임시</Link>
      </div>

      <div>
        <Link to={`/profile/${currentUser.id}`}>프로필 작업</Link>
      </div>
      <div>
        <Link to="/modify">수정</Link>
      </div>

      <button onClick={logoutHandler}>로그아웃</button>
    </div>
  );
};

export default Main;
