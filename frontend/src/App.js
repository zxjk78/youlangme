import "./App.css";
import React from "react";
import { Switch, BrowserRouter } from "react-router-dom";
import Login from "./features/auth/login/Login";
// import { useSelector } from "react-redux";
import SignUp from "./features/auth/signup/SignUp";
import ModifyUserInfo from "./features/auth/modify/ModifyUserInfo";
import Main from "./features/main/Main";
import PrivateRoute from "./common/routes/PrivateRoute"
import PublicRoute from "./common/routes/PublicRoute"

// import { useSelector } from "react-redux";
function App() {
  // const { isLoggedIn } = useSelector((state) => state.auth);
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <PublicRoute restricted exact path="/" component={Login}></PublicRoute>
          <PublicRoute restricted path="/signup" component={SignUp}></PublicRoute>
          <PrivateRoute path="/modify" component={ModifyUserInfo}></PrivateRoute>
          <PrivateRoute path="/main" component={Main}></PrivateRoute>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
