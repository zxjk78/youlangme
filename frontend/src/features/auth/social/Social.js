import { useEffect } from "react";
import { Cookies } from "react-cookie";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

const Social = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  useEffect(() => {
    localStorage.setItem("user", JSON.parse(Cookies.getAll()));
  }, []);
  return <div>{isLoggedIn && <Redirect to="/modify"></Redirect>}</div>;
};

export default Social;
