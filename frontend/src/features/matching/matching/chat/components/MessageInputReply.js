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
import SendButton from './UI/SendButton';

import styled from '@emotion/styled';

// custom component

// css
import classes from './MessageInputReply.module.scss';

const MyButton = styled(Button)`
  background-color: purple !important;
  border-radius: 15px !important;
  color: #fff !important;
  width: 100%;
  height: 70%;
`;
const MessageInputReply = (props) => {
  const messageValue = props.messageVal;
  const originalMessage = props.originalMessage;
  const originalMessageIdx = props.originalMessageIdx;
  const handleChange = (event) => {
    props.handleChange(event.target.value);
  };
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      props.sendReplyBtnClick();
    }
  };
  const handleSendReplyBtnClick = () => {
    props.sendReplyBtnClick(2, {
      message: messageValue,
      originMsg: originalMessage,
      originIdx: originalMessageIdx,
    });
  };
  const cancelModifyHandler = () => {
    props.cancelModify();
  };
  return (
    <>
      <div className={classes.main}>
        <Box
          sx={{
            // width: '100%',
            // maxWidth: '100%',
            bgcolor: '#fff',
            borderRadius: '10px',
            padding: '8px',
          }}
          component="div"
        >
          <div className={classes.grid1}>
            <div>
              <div>답장</div>
              <div onClick={cancelModifyHandler}>
                <CloseIcon />
              </div>
            </div>
            <div className={classes.originalMessage}>
              {originalMessage.length > 20
                ? originalMessage.slice(0, 20) + '...'
                : originalMessage}
            </div>
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
            <SendButton btnClick={handleSendReplyBtnClick} />
          </div>
        </Box>
      </div>
    </>
  );
};
export default MessageInputReply;
