
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../../../features/auth/authSlice';
import classes from './Header.module.scss';
import youlangme from '../../../assets/youlangme.jpg';
import go from '../../../assets/go.png';


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

const pages = ['Products', 'Pricing', 'Blog'];


const Header = () => {
  const { currentUser } = useSelector((state) => state.auth);
  console.log(currentUser)
  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(logout())
      .unwrap()
      .then(() => {
        document.location.href = '/';
      });

  };

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
      sx={{ borderRadius: 4}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            YOULANGME
          </Typography>
          <Typography
            variant="h4"
            noWrap
            component="a"
            href="/start"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              // fontFamily: 'monospace',
              fontWeight: 700,
              // letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            MATCH
          </Typography>

          

          <Box sx={{ ml:'auto' }}>
            <Tooltip title={currentUser.name}>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                {/* 프로필 이미지 넣기! */}
                <Avatar  sx={{ width: 56, height: 56 }} alt="" src="" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
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
              <MenuItem onClick={handleCloseUserMenu}>
                <Typography 
                  textAlign="center"
                  // textDecoration='none'   
                  component="a"
                  sx={{ textDecoration:'none', color:'black'}}
                  href={`/profile/${currentUser.id}`} >
                  MY PAGE</Typography>
              </MenuItem>
              <MenuItem onClick={handleCloseUserMenu}>
                <Typography textAlign="center"
                  component="p"
                  onClick={logoutHandler}>
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



