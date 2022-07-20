import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { logout } from "../auth/authSlice";
const Main = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const history = useHistory();
  const logoutHandler = () => {
    dispatch(logout());
    history.push("/");
  };
  console.log(isLoggedIn);
  // const { user } = useSelector((state) => state.auth);
  // console.log(user);
  return (
    <div>
      <h2>이곳은 임시 홈페이지</h2>
      <p>{isLoggedIn}</p>
      <button onClick={logoutHandler}>로그아웃</button>
    </div>
  );
};

export default Main;
