import React, { useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../features/auth/authSlice";

export default function PrivateRoute({ component: Component, ...rest }) {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.auth);
  useEffect(() => dispatch(getUser()), []);

  return (
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
}
