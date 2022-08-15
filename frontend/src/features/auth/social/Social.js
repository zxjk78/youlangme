// import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { socialLogin } from "../authSlice";
//import { Redirect } from "react-router-dom";
const Social = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const getCookieValue = (key) => {
    let cookieKey = key + "=";
    let result = "";
    const cookieArr = document.cookie.split(";");

    for (let i = 0; i < cookieArr.length; i++) {
      if (cookieArr[i][0] === " ") {
        cookieArr[i] = cookieArr[i].substring(1);
      }

      if (cookieArr[i].indexOf(cookieKey) === 0) {
        result = cookieArr[i].slice(cookieKey.length, cookieArr[i].length);
        return result;
      }
    }
    return result;
  };

  useEffect(() => {
    const data = {
      accessToken: getCookieValue("accessToken"),
      refreshToken: getCookieValue("refreshToken"),
      accessTokenExpireDate: getCookieValue("accessTokenExpireDate"),
    };
    if (getCookieValue("accessToken")) {
      localStorage.setItem("user", JSON.stringify(data));
      dispatch(socialLogin());
      history.push("/main");
    }
  }, [dispatch]);

  return <div></div>;
};

export default Social;
