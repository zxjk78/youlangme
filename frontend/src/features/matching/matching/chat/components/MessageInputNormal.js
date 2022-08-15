import * as React from 'react';
// react core

// API

// external module

// external component
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import SendButton from './UI/SendButton';
import TranslateButton from './UI/TranslateButton';
import styled from '@emotion/styled';
// custom component

// css
import classes from './MessageInputNormal.module.scss';

const CustomBox = styled(Box)`
  width: 100%;
  background-color: #fff;
  border-radius: 0px 0px 16px 16px;
  display: flex;

  align-items: center;
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
    props.sendBtnClick(1, { message: messageValue });
  };
  const handleTranslateBtnClick = () => {
    props.msgTranslate();
  };
  return (
    <>
      <div className={classes.main}>
        <CustomBox component="div">
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
          <TranslateButton btnClick={handleTranslateBtnClick} />
          <SendButton btnClick={handleSendBtnClick} />
        </CustomBox>
      </div>
    </>
  );
};
export default MessageInputNormal;
