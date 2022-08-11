
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../../../features/auth/authSlice';
import classes from './Header.module.scss';
import youlangme from '../../../assets/logo_2.png';
import go from '../../../assets/go.png';

// API
import { fetchProfileImg } from '../../../features/profile/LeftProfile/LeftProfileAPI';

// mui
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
// import AdbIcon from '@mui/icons-material/Adb';
import TranslateIcon from '@mui/icons-material/Translate';
import ShuffleOnIcon from '@mui/icons-material/ShuffleOn';
import VideoCameraFrontIcon from '@mui/icons-material/VideoCameraFront';
import StartIcon from '@mui/icons-material/Start';
import Logout from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';
import { CircularProgress, ListItemIcon } from '@mui/material';
import { grey } from '@mui/material/colors';



const pages = ['Products', 'Pricing', 'Blog'];


const Header = () => {
  const { isProfileImgUpdated }  = useSelector((state) => state.profile);
  const { currentUser } = useSelector((state) => state.auth);
  
  // console.log(currentUser)
  const dispatch = useDispatch();

  const [profileImg, setProfileImg] = useState(null);
  const [isUploaded, setIsUploaded] = useState(false)
  const [isLoading, setIsLoading] = useState(true);


  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    console.log(event.currentTarget)
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const logoutHandler = () => {
    handleCloseUserMenu()
    dispatch(logout())
      .unwrap()
      .then(() => {
        document.location.href = '/';
      });

  };
  // 리덕스로 isprofileImgUploaded 관리해서 leftprofile에서 이미지 업데이트 했을때
  // 내브바랑, 프로필 페이지 우측에 게시글 프사 다시 불러오게
  // const updateProfileImg = (isUpdated) => {
  //   console.log(isUpdated, '내브바 프로필  이미지 업데이트여부')
  //   if (isUpdated) {
  //     setIsUploaded(true)
  //   }
  // }



  useEffect(() => {
    (
      async () => {
        const profileImage = await fetchProfileImg(currentUser.id);
      
        setProfileImg(profileImage)
        setIsLoading(false);
        console.log('navbar 프사: ', profileImg)
      })();

    return () => {
      setProfileImg(null)
    }
  }, [currentUser.id, isProfileImgUpdated]);



  return (
    // <nav className={classes.navbar}>
    //     <Link to="/main">
    //       <img src={youlangme} className={classes.navbar__logo}></img>
    //     </Link>
    //     <Link to="/start">
    //       <img src={go} className={classes.navbar__logo}></img>
    //     </Link>
    //   </div>
    //   <div className={classes.dropdown}>
    //     <span className={classes.name}>{currentUser.name}</span>
    //     <div className={classes.content}>
    //       <Link to={`/profile/${currentUser.id}`} className={classes.link}>
    //         My Profile
    //       </Link>
    //       <p onClick={logoutHandler}>Logout</p>
    //     </div>
    // </nav>

    <div className={classes.navbar}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <div className={classes.navbar__left}>
              <Link to="/main">
                <img src={youlangme} className={classes.navbar__logo}/>
              </Link>
              <Link to="/start-intro">
                <StartIcon sx={{ fontSize: '50px', color: '#FFC700',  ml: 3}}/>
              </Link>
          </div>
        
          

          <Box sx={{ ml:'auto' }}>
            <Tooltip title={currentUser.name}>
              <Button onClick={handleOpenUserMenu} sx={{ py: 1, px:2, width: '100%'}}>
                {/* 프로필 이미지 넣기! */}
                {  isLoading ? <CircularProgress /> : 
                  <Avatar  sx={{ width: 56, height: 56, mr:2}} alt="" src={profileImg} />}
                <Typography
                  sx={{
                    // mr: 2,
                    // display: { xs: 'none', md: 'flex' },
                    // fontFamily: 'monospace',
                    fontWeight: 700,
                    // letterSpacing: '.3rem',
                    color: 'black',
                    textDecoration: 'none',
                  }}>
                  {currentUser.name}
                </Typography>
              </Button>
            </Tooltip>
            <Menu
              sx={{ mt: '60px',  }}
              id="profile-menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <Link to={`/profile/${currentUser.id}`} className={classes.link}>
                <MenuItem onClick={handleCloseUserMenu} sx={{ py: 2, px: 3}}>
                  <ListItemIcon>
                    <HomeIcon fontSize="medium"/>
                  </ListItemIcon>
                  <Typography 
                    textAlign="center"   
                    >
                    MY PAGE</Typography>
                </MenuItem>
              </Link>
      
              <MenuItem onClick={logoutHandler} sx={{ py: 2, px: 3}}>
                  <ListItemIcon >
                    <Logout fontSize="medium" className={classes.header_profile_menu_icon}/>
                  </ListItemIcon>
                  <Typography textAlign="center"
                    component="p">
                    LOGOUT</Typography>
              </MenuItem>
            
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </div>
  );
};

export default Header;



