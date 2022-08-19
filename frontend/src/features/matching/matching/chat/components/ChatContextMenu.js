import * as React from 'react';

import Paper from '@mui/material/Paper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import GTranslateIcon from '@mui/icons-material/GTranslate';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import SpellcheckIcon from '@mui/icons-material/Spellcheck';
import classes from './ChatContextMenu.module.scss';
import styled from '@emotion/styled';

export default function MenuListComposition(props) {
  const style = {
    zIndex: 99999,
    position: 'fixed',
    top: `${props.clientY + 20}px`,
    left: `${props.clientX}px`,
  };
  const translateHandler = () => {
    props.translate(props.target);
  };
  const copyHandler = () => {
    props.copy(props.target);
  };
  const modifyHandler = () => {
    props.modify(props.target);
  };
  return (
    <div style={style}>
      <Paper sx={{ padding: '8px 15px 8px 10px' }}>
        <MenuList
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: '10px',
          }}
        >
          <MenuItem onClick={translateHandler}>
            <GTranslateIcon />
            <div className={classes.option}>번역</div>
          </MenuItem>
          <MenuItem onClick={copyHandler}>
            <ContentCopyIcon />
            <div className={classes.option}>복사</div>
          </MenuItem>
          <MenuItem onClick={modifyHandler}>
            <SpellcheckIcon />
            <div className={classes.option}>답장</div>
          </MenuItem>
        </MenuList>
      </Paper>
    </div>
  );
}
