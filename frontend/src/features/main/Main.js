import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getUser, logout } from "../auth/authSlice";
const Main = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { currentUser } = useSelector((state) => state.auth)
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect( () => {
   dispatch(getUser()) 
   if (!currentUser.name){
    history.push('/modify')
   }
  }, [dispatch, history, currentUser])
  const logoutHandler = () => {
    dispatch(logout());
    history.push("/");
  };
  // if (currentUser.name == null){
  //   history.push('/modify')
  // }
  console.log(isLoggedIn);
  console.log(currentUser)
  // const { user } = useSelector((state) => state.auth);
  // console.log(user);
  return (
    <div>
      <h2>이곳은 임시 홈페이지</h2>
      
      <button onClick={logoutHandler}>로그아웃</button>
    </div>
  );
};

export default Main;
