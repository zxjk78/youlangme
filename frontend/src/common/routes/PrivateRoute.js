import React, { useEffect } from 'react';
import { Route, Redirect, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, logout } from '../../features/auth/authSlice';
import { isLogin } from '../api/isLogin';

export default function PrivateRoute({ component: Component, ...rest }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { isLoggedIn, currentUser } = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(getUser());
    return () => {
      dispatch(logout());
    };
  }, []);

  if (currentUser == undefined) {
    console.log(currentUser);
  }
  //   return <Redirect to="/main" />;
  // }

  return (
    <Route
      {...rest}
      render={(props) =>
        isLogin() ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
}
