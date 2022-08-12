import { useState } from "react"

import StartChat from "./StartChat";

// router
import { useHistory } from 'react-router-dom';

//mui
import { Button } from "@mui/material";
import { styled } from '@material-ui/styles';

// import StartButton from "./StartButton";

// css
// import '../../../index.css'
import classes from './StartMatch.module.scss'



const ColorButton = styled(Button)(({ theme }) => ({
  // color: theme.palette.getContrastText(yellow[500]),
  fontSize: 30,
  fontWeight: 1000,
  lineHeight: 1.5,
  padding: '10px 20px',
  width: 300,

  border: '1px solid #CAD6E2',
  borderRadius: 14,
  backgroundColor: '#F0C325',
  '&:hover': {
    backgroundColor: '#D4AC1C',
  },
}));

const IntroMatch = () => {
  const history = useHistory();

  const matchStartHandler = () => {
    history.push('/start-match');
  }


  return (

    <div className={`${classes.match_wrapper} ${classes.intro_bg}`}>
      <div className={classes.match_intro}>매칭을</div>
      <div className={classes.match_intro}>시작하시겠습니까?</div>
      <ColorButton variant="contained" sx={{mt:3}} onClick={matchStartHandler} >시작!</ColorButton>
    </div>

  );
};

export default IntroMatch;