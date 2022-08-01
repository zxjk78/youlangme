import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import Header from '../../common/UI/Header/Header';

import { logout } from '../auth/authSlice';

import UserInfo from '../profile/UserInfo/UserInfo';

const Main = () => {
  const { currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const history = useHistory();
  const logoutHandler = () => {
    dispatch(logout())
      .unwrap()
      .then(() => {
        document.location.href = '/';
      });
  };
  // console.log(currentUser.name);
  if (currentUser.name === null) {
    history.push('/modify');
  }
  // const { user } = useSelector((state) => state.auth);
  // console.log(user);
  return (
    <div>
      {currentUser.name && <Header></Header>}
      <h2>이곳은 임시 홈페이지</h2>
      <div>
        <Link to="/board/detail">게시판 작업, 뒤에 /게시글번호</Link>
      </div>
      <div>
        <Link to="/board/create">게시판 생성작업</Link>
      </div>
      <div>피드 - 아직 boardPk 못받음</div>

      <div>
        <Link to={`/profile/${currentUser.id}`}>프로필 작업</Link>
      </div>
      <div>
        <Link to="/modify">수정</Link>
      </div>
      <div>
        <Link to="/match">매칭</Link>
      </div>
      <button onClick={logoutHandler}>로그아웃</button>
    </div>
  );
};

export default Main;
