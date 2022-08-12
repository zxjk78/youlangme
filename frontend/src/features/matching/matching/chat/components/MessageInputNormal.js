import * as React from 'react';
// react core

// API

// external module

// external component
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { purple } from '@mui/material/colors';
import styled from '@emotion/styled';
// custom component

// css
import classes from './MessageInputNormal.module.scss';

const MyButton = styled(Button)`
  background-color: purple !important;
  border-radius: 15px !important;
`;

const MessageInputNormal = (props) => {
  const messageValue = props.messageVal;
  const handleChange = (event) => {
    props.handleChange(event.target.value);
  };
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      props.handleKeyPress();
    }
  };
  const handleSendBtnClick = () => {
    props.sendBtnClick();
  };
  return (
    <>
      <div className={classes.main}>
        <Box
          sx={{
            width: '100%',
            maxWidth: '100%',
            bgcolor: '#fff',
            borderRadius: '16px',
          }}
        >
          <TextField
            fullWidth
            id="fullWidth"
            sx={{
              '& .MuiOutlinedInput-notchedOutline': {
                border: '0 none',
              },
            }}
            value={messageValue}
            onChange={handleChange}
            onKeyPress={handleKeyPress}
          />
          <MyButton
            size="small"
            endIcon={<SendIcon />}
            onClick={handleSendBtnClick}
          >
            Send
          </MyButton>
        </Box>
      </div>
    </>
  );
};
export default MessageInputNormal;
