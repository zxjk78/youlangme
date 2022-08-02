import React, { useState } from 'react';

// mui
import { Box, Button, IconButton, Stack, Typography } from '@mui/material';
import {  createTheme, ThemeProvider } from '@mui/material/styles';
import CancelIcon from '@mui/icons-material/Cancel';
import { grey } from '@mui/material/colors';

// data
import { mainColors } from '../ProfileColorPalette'

// css
import classes from './RightProfile.module.scss'

const LevelStatistic = (props) => {
  const setOpen = props.setModalOpen

  const myTheme = createTheme({
    palette: mainColors
  });

  const style = {
    position: 'absolute',
    top: '50%', left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    height: 500,
    fontWeight: 'bold',
    backgroundColor: 'background.paper',
    border: '3px solid #9BA7AF',
    borderRadius: 5,
    boxShadow: 24,
    px: 4, py: 2,
  };

  return (
    <Box sx={style}>
      <div className={classes.modal_header}>
        <Typography variant="button"
          sx={{ fontSize: 23, fontWeight: 'bold'}} component="span">레벨 상세 정보</Typography>
        <IconButton 
          size="small" onClick={() => setOpen(false)}>
          <CancelIcon sx={{ color: grey[400], fontSize: 30 }} />
        </IconButton>
      </div>
      <ThemeProvider theme={myTheme}>
        <Stack direction='column' spacing={1}>
        </Stack>
      </ThemeProvider>
    </Box>

  );
};

export default LevelStatistic;