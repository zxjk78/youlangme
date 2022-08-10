import * as React from 'react';
// react core

// API

// external module

// external component
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';

// custom component

// css
import classes from './MessageInput.module.scss';

const MessageInput = (props) => {
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
      <div className={classes.wrapper}>
        <div className={classes.container}>
          <div className={classes.main}>
            <Box
              sx={{
                width: 500,
                maxWidth: '100%',
                bgcolor: '#fff',
                borderRadius: '10px',
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
              <Button
                variant="contained"
                endIcon={<SendIcon />}
                sx={{}}
                onClick={handleSendBtnClick}
              >
                Send
              </Button>
            </Box>
          </div>
        </div>
      </div>
    </>
  );
};
export default MessageInput;
