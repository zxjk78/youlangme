import React, { useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../features/auth/authSlice";
<<<<<<< HEAD

export default function PrivateRoute({ component: Component, ...rest }) {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.auth);
=======
import { isLogin } from "../api/isLogin";
export default function PrivateRoute({ component: Component, ...rest }) {
  const dispatch = useDispatch();
  const { isLoggedIn, currentUser } = useSelector((state) => state.auth);
>>>>>>> 3bcfe4e12868300193c250da9827ebb2fda29233
  useEffect(() => dispatch(getUser()), []);

  return (
    <Route
      {...rest}
      render={(props) =>
        isLogin() ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
}
