import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { logout } from "../auth/authSlice";
const Main = () => {
  const { isLoggedIn, currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const history = useHistory();
  const logoutHandler = () => {
    dispatch(logout());
  };
  console.log(currentUser.id);

  // const { user } = useSelector((state) => state.auth);
  // console.log(user);
  return (
    <div>
      <h2>이곳은 임시 홈페이지</h2>
      <div>
        <Link to="/board">게시판 작업</Link>
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
