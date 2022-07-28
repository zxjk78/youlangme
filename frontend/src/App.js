import "./App.css";
import React from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import Login from "./features/auth/login/Login";
// import { useSelector } from "react-redux";
import SignUp from "./features/auth/signup/SignUp";
import ModifyUserInfo from "./features/auth/modify/ModifyUserInfo";
import Main from "./features/main/Main";
// import { useSelector } from "react-redux";
function App() {
  // const { isLoggedIn } = useSelector((state) => state.auth);
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Login}></Route>
          <Route path="/main" component={Main}></Route>
          <Route path="/signup" component={SignUp}></Route>
          <Route path="/modify" component={ModifyUserInfo}></Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
