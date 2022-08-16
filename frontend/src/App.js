import './App.css';
import React, { useEffect, useRef, useState } from 'react';
import { Switch, BrowserRouter, useHistory, Redirect } from 'react-router-dom';
import Login from './features/auth/login/Login';
import Login2 from './features/auth/login/Login2';
// import { useSelector } from "react-redux";

import SignUp from './features/auth/signup/SignUp';
import SignUp2 from './features/auth/signup/SignUp2';

import Main from './features/main/Main';
import MyPage from './features/profile/MyPage';
import PrivateRoute from './common/routes/PrivateRoute';
import PublicRoute from './common/routes/PublicRoute';
import Social from './features/auth/social/Social';
import { useSelector, useDispatch } from 'react-redux';
import Board from './features/board/Board';
import BoardDetailModal from './features/board/detail/components/BoardDetailModal';
import StartMatching from './features/matching/StartMatching';
import IntroMatch from './features/matching/beforeMatching/IntroMatch';
import ModifyPage from './features/auth/modify/ModifyPage';
import VideoRoomComponent from './features/matching/matching/VideoRoomComponent';
import VideoRoomComponentLocal2 from './features/matching/matching/VideoRoomComponentLocal2';
import NotFound from './features/other/NotFound/NotFound';
//test
import Maintmp from './features/main/Maintmp';
import ProfileBoardSummaryList from './features/profile/RightProfile/profileBoardSummary/ProfileBoardSummaryList';
import Header from './common/UI/Header/Header';
import axios from 'axios';
import { API_URL } from './common/api/http-config';
import { resetLogin } from './features/auth/authSlice';
// import RightProfile from './features/profile/RightProfile/RightProfile';
// import MyPageBoard from './features/profile/MyPageBoard';

function App() {
  // const { currentUser } = useSelector((state) => state.auth);
  const { isLoggedIn } = useSelector((state) => state.auth);
  const history = useHistory();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.auth);
  const name = Object.keys(currentUser).length != 0 ? currentUser.name : null;
  const reissueToken = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const accessToken = user ? user.accessToken : null;
    const refreshToken = user ? user.refreshToken : null;
    axios
      .post(
        API_URL + 'reissue',
        {
          accessToken: accessToken,
          refreshToken: refreshToken,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      .then((response) => {
        localStorage.removeItem('user');
        localStorage.setItem('user', JSON.stringify(response.data.data));
        console.log(response.data.data);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  useEffect(() => {
    let timer1Id = setInterval(() => {
      const user = JSON.parse(localStorage.getItem('user'));
      const accessToken = user ? user.accessToken : null;
      const refreshToken = user ? user.refreshToken : null;
      if (isLoggedIn) {
        axios
          .post(
            API_URL + 'reissue',
            {
              accessToken: accessToken,
              refreshToken: refreshToken,
            },
            {
              headers: {
                'Content-Type': 'application/json',
              },
            }
          )
          .then((response) => {
            localStorage.removeItem('user');
            localStorage.setItem('user', JSON.stringify(response.data.data));
            console.log(response.data.data);
          })
          .catch((err) => {
            dispatch(resetLogin());
            history.push('/');
          });
      }
    }, 1800000);
    return () => {
      if (!isLoggedIn) {
        clearInterval(timer1Id);
      }
    };
  }, [isLoggedIn]);

  return (
    <div class="App">
      <BrowserRouter>
        {name && <Header />}
        <Switch>
          <PublicRoute
            restricted
            exact
            path="/"
            component={Login2}
          ></PublicRoute>
          <PublicRoute
            restricted
            path="/signup"
            component={SignUp2}
          ></PublicRoute>
          <PublicRoute path="/social" component={Social}></PublicRoute>
          <PrivateRoute path="/modify" component={ModifyPage}></PrivateRoute>
          <PrivateRoute path="/start-intro" exact component={IntroMatch} />
          <PrivateRoute path="/start-match" exact component={StartMatching} />
          <PrivateRoute path="/profile/:userId" exact component={MyPage} />
          {/* <PrivateRoute path="/profile/:userId/board" exact component={MyPageBoard}/> */}

          <PrivateRoute
            exact
            path="/match"
            s
            component={VideoRoomComponent}
          ></PrivateRoute>
          {/* local 작업중 */}
          <PrivateRoute
            exact
            path="/match2"
            s
            component={VideoRoomComponentLocal2}
          ></PrivateRoute>
          <PrivateRoute exact path="/main" component={Main}></PrivateRoute>

          {/* 게시판, 생성 및 수정 사용하는 PrivateRoute  */}
          <PrivateRoute
            exact
            path="/board/create"
            component={Board}
          ></PrivateRoute>
          <PrivateRoute
            exact
            path="/board/update/:boardId"
            component={Board}
          ></PrivateRoute>
          <PrivateRoute
            exact
            path="/board/detail/:boardId"
            component={BoardDetailModal}
          ></PrivateRoute>

          {/* test용 public route */}
          <PrivateRoute path="/test" component={Maintmp}></PrivateRoute>
          <PublicRoute path="/login2" component={Login2}></PublicRoute>
          <PublicRoute path="/signup2" component={SignUp2}></PublicRoute>

          {/* 404 route */}
          <PrivateRoute path="*" component={NotFound}></PrivateRoute>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
