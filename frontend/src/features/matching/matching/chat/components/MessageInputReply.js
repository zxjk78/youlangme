import * as React from 'react';
// react core

// API

// external module

// external component
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Divider from '@mui/material/Divider';
import CloseIcon from '@mui/icons-material/Close';
// custom component

// css
import classes from './MessageInputReply.module.scss';

const MessageInputReply = (props) => {
  const messageValue = props.messageVal;
  const originalMessage = props.originalMessage;
  const handleChange = (event) => {
    props.handleChange(event.target.value);
  };
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      props.sendReplyBtnClick();
    }
  };
  const handleSendReplyBtnClick = () => {
    props.sendReplyBtnClick();
  };
  const cancelModifyHandler = () => {
    props.cancelModify();
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
                padding: '8px',
              }}
            >
              <div className={classes.grid1}>
                <div>
                  <div>답장</div>
                  <div onClick={cancelModifyHandler}>
                    <CloseIcon />
                  </div>
                </div>
                <div>{originalMessage.slice(0, 200)}</div>
                <Divider />
              </div>
              <div className={classes.grid2}>
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
              </div>
              <div className={classes.grid3}>
                <Button
                  variant="contained"
                  endIcon={<SendIcon />}
                  sx={{}}
                  onClick={handleSendReplyBtnClick}
                >
                  Send
                </Button>
              </div>
            </Box>
          </div>
        </div>
      </div>
    </>
  );
};
export default MessageInputReply;
