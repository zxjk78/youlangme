import React from 'react';
import { Button } from "@mui/material";
import { styled } from '@material-ui/styles';


const ColorButton = styled(Button)(({ theme }) => ({
  // color: theme.palette.getContrastText(yellow[500]),
  border: '1px solid #CAD6E2',
  fontSize: '10px',
  backgroundColor: '#F0C325',
  '&:hover': {
    backgroundColor: '#ffd600',
  },
}));


const StartButton = () => {
  return (
    <>
      <ColorButton variant="contained" >시작!</ColorButton>
    </>
  );
};

export default StartButton;