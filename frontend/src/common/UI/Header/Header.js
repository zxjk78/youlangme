import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../../features/auth/authSlice";
import classes from "./Header.module.scss";
import youlangme from "../../../assets/youlangme.jpg";
import go from "../../../assets/go.png";
const Header = () => {
  const { currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(logout())
      .unwrap()
      .then(() => {
        document.location.href = "/";
      });
  };
  return (
    <nav className={classes.navbar}>
      <div>
        <Link to="/main">
          <img src={youlangme} className={classes.navbar__logo}></img>
        </Link>
        <Link to="/start">
          <img src={go} className={classes.navbar__logo}></img>
        </Link>
      </div>
      <div className={classes.dropdown}>
        <span className={classes.name}>{currentUser.name}</span>
        <div className={classes.content}>
          <Link to={`/profile/${currentUser.id}`} className={classes.link}>
            My Profile
          </Link>
          <p onClick={logoutHandler}>Logout</p>
        </div>
      </div>
    </nav>
  );
};

export default Header;
