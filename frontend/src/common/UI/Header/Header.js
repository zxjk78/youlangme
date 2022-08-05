
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../../../features/auth/authSlice';
import classes from './Header.module.scss';
import youlangme from '../../../assets/youlangme.jpg';
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
import AdbIcon from '@mui/icons-material/Adb';
import ShuffleOnIcon from '@mui/icons-material/ShuffleOn';
import Logout from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';
import { CircularProgress, ListItemIcon } from '@mui/material';



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



  // Mui AppBar 참고해서 만들기!!!!!!!!
  return (
    // <nav className={classes.navbar}>
    //   <div>
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
    //   </div>
    // </nav>
    <AppBar position="static" className={classes.navbar} color='transparent' 
      sx={{ borderRadius: 0}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{
            // display: { xs: 'none', md: 'flex' }, 
            mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              // display: { xs: 'none', md: 'flex' },
              // fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            너LANG나
          </Typography>

          <Typography
            variant="h4"
            noWrap
            component="a"
            href="/start"
            sx={{
              ml: 2,
              // display: { xs: 'none', md: 'flex' },
              // fontFamily: 'monospace',
              fontWeight: 700,
              // letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            <ShuffleOnIcon sx={{ fontSize: '40px', color: '#B865C6' }}/>
          </Typography>

          

          <Box sx={{ ml:'auto' }}>
            <Tooltip title={currentUser.name}>
              <Button onClick={handleOpenUserMenu} sx={{ p: 1 }}>
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
              sx={{ mt: '60px' }}
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
              <MenuItem onClick={handleCloseUserMenu} sx={{ py: 2, px: 3}}>
                <Typography 
                  textAlign="center"
                  // textDecoration='none'   
                  component="a"
                  sx={{ textDecoration:'none', color:'black'}}
                  href={`/profile/${currentUser.id}`} >
                <ListItemIcon>
                  <HomeIcon fontSize="medium"/>
                </ListItemIcon>
                  MY PAGE</Typography>
              </MenuItem>
              <MenuItem onClick={handleCloseUserMenu} sx={{ py: 2, px: 3}}>
                <Typography textAlign="center"
                  component="p"
                  onClick={logoutHandler}>
                  <ListItemIcon >
                    <Logout fontSize="medium" className={classes.header_profile_menu_icon}/>
                  </ListItemIcon>
                  LOGOUT</Typography>
              </MenuItem>
            
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;



