import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import styled from '@emotion/styled';
import Box from '@mui/material/Box';

import LogoutIcon from '@mui/icons-material/Logout';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import NewspaperIcon from '@mui/icons-material/Newspaper';
const MenuCustom = styled(Menu)`
  & ul {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 10px 8px;
  }
`;
const MenuItemCustom = styled(MenuItem)`
  width: 110px;
  text-align: left;
  justify-content: flex-start;
  span {
    &:nth-child(1) {
      margin-left: -15px;
    }
    width: 20px;
    margin: 0px 10px 0px 10px;
  }
`;
const ButtonCustom = styled(Button)`
  display: flex;
  flex-direction: column;
  .text {
    font-size: 0.9rem;
    color: aliceblue;
    font-weight: bold;
  }
`;
const BoxCustom = styled(Box)`
  width: 50px;
  height: 50px;
  background-color: aliceblue;
  border-radius: 70%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default function ExtraMenuButton(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const newsHandler = () => {
    setAnchorEl(null);
    props.news();
  };
  const exitHandler = () => {
    setAnchorEl(null);
    props.quit();
  };

  return (
    <div>
      <ButtonCustom
        id="basic-button"
        onClick={handleClick}
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
      >
        <BoxCustom component={'div'}>
          <MoreVertIcon />
        </BoxCustom>
        {/* <div className="text">Etc</div> */}
      </ButtonCustom>
      <MenuCustom
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <MenuItemCustom onClick={newsHandler}>
          <span>
            <NewspaperIcon />
          </span>
          <span>News</span>
        </MenuItemCustom>
        <MenuItemCustom onClick={exitHandler}>
          <span>
            <LogoutIcon />
          </span>
          <span>Exit</span>
        </MenuItemCustom>
        {/* <MenuItem onClick={handleClose}>Logout</MenuItem> */}
      </MenuCustom>
    </div>
  );
}
