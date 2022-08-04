import './App.css';
import React from 'react';
import { Switch, BrowserRouter } from 'react-router-dom';
import Login from './features/auth/login/Login';
// import { useSelector } from "react-redux";
import SignUp from './features/auth/signup/SignUp';
import Main from './features/main/Main';
import MyPage from './features/profile/MyPage';
import PrivateRoute from './common/routes/PrivateRoute';
import PublicRoute from './common/routes/PublicRoute';
import Social from './features/auth/social/Social';
// import { useSelector } from "react-redux";
import Board from './features/board/Board';
import BoardDetailModal from './features/board/detail/components/BoardDetailModal';
import BoardMainItem from './features/main/feed/components/FeedBoardItem';
import StartMatching from './features/matching/StartMatching';
import ModifyPage from './features/auth/modify/ModifyPage';
import VideoRoomComponent from './features/matching/matching/VideoRoomComponent';
import NotFound from './features/other/NotFound/NotFound';
//test
import Maintmp from './features/main/Maintmp';
import ProfileBoardSummeryList from './features/profile/RightProfile/profileBoardSummery/ProfileBoardSummeryList';
import RightProfile from './features/profile/RightProfile/RightProfile';
import MyPageBoard from './features/profile/MyPageBoard';

function App() {
  // const { isLoggedIn } = useSelector((state) => state.auth);
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <PublicRoute
            restricted
            exact
            path="/"
            component={Login}
          ></PublicRoute>
          <PublicRoute
            restricted
            path="/signup"
            component={SignUp}
          ></PublicRoute>
          <PublicRoute path="/social" component={Social}></PublicRoute>
          <PrivateRoute path="/modify" component={ModifyPage}></PrivateRoute>
          <PrivateRoute path="/start" exact component={StartMatching} />
          <PrivateRoute path="/profile/:userId" exact component={MyPage}/>
          {/* <PrivateRoute path="/profile/:userId/board" exact component={MyPageBoard}/> */}

          <PrivateRoute
            exact
            path="/match"s
            component={VideoRoomComponent}
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
          <PrivateRoute
            path="/test2/:userId"
            component={ProfileBoardSummeryList}
          ></PrivateRoute>
          {/* 404 route */}
          <PrivateRoute path="*" component={NotFound}></PrivateRoute>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
