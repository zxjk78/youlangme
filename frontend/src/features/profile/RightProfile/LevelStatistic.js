import React, { useState } from 'react';

// mui
import { Badge, Box, Button, IconButton, Stack, Typography } from '@mui/material';
import {  createTheme, ThemeProvider, styled } from '@mui/material/styles';
import CancelIcon from '@mui/icons-material/Cancel';
import { grey } from '@mui/material/colors';

// data
import { mainColors } from '../ProfileColorPalette'
import { LevelCriteria } from '../../../data/Level';

// css
import classes from './RightProfile.module.scss'

// chart
import { ResponsiveBar, BarTooltipDatum } from '@nivo/bar';
import { BasicTooltip } from '@nivo/tooltip';



const levelDetailData = [
  {
    "detail": `출석일수`,
    "exp": 30,
    "expColor": "hsl(100, 70%, 50%)"
  },
  {
    "detail": "댓글 개수",
    "exp": 88,
    "expColor": "hsl(248, 70%, 50%)",
  },
  {
    "detail": "게시글 개수",
    "exp": 75,
    "expColor": "hsl(102, 70%, 50%)"
  },
  {
    "detail": "총 대화시간",
    "exp": 60,
    "expColor": "hsl(62, 70%, 50%)"
  },
]

const LevelStatistic = (props) => {

  const trophyColor = props.trophyColor
  const levelId = props.levelId
  const exp = props.exp
  
  const setOpen = props.setModalOpen

  const myTheme = createTheme({
    palette: mainColors
  });

  const style = {
    position: 'absolute',
    top: '50%', left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    height: 500,
    fontWeight: 'bold',
    backgroundColor: 'background.paper',
    border: '3px solid #9BA7AF',
    borderRadius: 5,
    boxShadow: 24,
    px: 4, py: 2,
  };


  const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      right: 0,
      top: 20,
      border: `2px solid ${theme.palette.background.paper}`,
      fontSize: 25, fontWeight: 'bold', height: 40, width: 40,
      color: 'white', borderRadius: '50%',
      backgroundColor: '#B865C6',
      padding: '0 4px',
    },
  }));


  // <Badge badgeContent={1} overlap="circular"
  //         anchorOrigin={{
  //           vertical: 'bottom',
  //           horizontal: 'right',
  //         }}
  //         sx={{ "& .MuiBadge-badge": { fontSize: 25,fontWeight: 'bold', height: 40, width: 40,
  //         borderRadius: '50%', color: 'white',
  //         backgroundColor: '#686868', }}}
  //         >
  //         {/* <EmojiEventsIcon sx={{ fontSize: 140, color: '#FFC700' }} className={classes.trophy} /> */}
  //       </Badge>


  const barTooltip = (item) => {

      return (
        // <div style={{
        //     background: 'white',
        //     padding: '9px 12px',
        //     border: '1px solid #ccc',
        //     color: item.color
        // }}>
        //  <div> {item.indexValue}</div>
        //  <div>{item.id}:{item.value}</div>
        // </div>
          <BasicTooltip
              id={item.indexValue}
              value={`123hrs  =>  ${item.value} exp` }
              color={item.color}
              enableChip
          ></BasicTooltip>
      );
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
      <div className={classes.modal_level_badge}>
        <StyledBadge badgeContent={LevelCriteria[levelId][1]} >
          <Typography gutterBottom color={trophyColor}
            component="span"
            sx={{ fontSize: 40, fontWeight: 'bold', mr:2}}
            >
            {LevelCriteria[levelId][0]}</Typography>
        </StyledBadge>
        <Typography gutterBottom color="#9BA7AF" 
          component="span"
          sx={{ fontSize: 20, fontWeight: 'medium', ml:4}}
          >
          {`exp. ${exp}`}</Typography>
      </div>


        

      <div className={classes.level_detail_chart}>
        <ResponsiveBar 
          data={levelDetailData}
          keys={[
              'exp'
          ]}
          indexBy="detail"
          margin={{ top: 10, right: 20, bottom: 100, left: 80 }}
          padding={0.4}
          layout="horizontal"
          valueScale={{ type: 'linear' }}
          indexScale={{ type: 'band', round: true }}
          colors={{ scheme: 'nivo' }}
          colorBy="indexValue"
          // defs={[
          // ]}
          // fill={[
          // ]}
          borderRadius={20}
          borderWidth={2}
          borderColor={{
              from: 'color',
              modifiers: [
                  [
                      'darker',
                      '0.5'
                  ]
              ]
          }}
          axisTop={null}
          axisRight={null}
          axisBottom={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: 'exp',
              legendPosition: 'middle',
              legendOffset: 36
          }}
          axisLeft={{
              tickSize: 0,
              tickPadding: 14,
              tickRotation: 0,
              // legend: 'Level',
              legendPosition: 'middle',
              legendOffset: -40
          }}
          enableGridX={true}
          enableGridY={false}
          labelSkipWidth={12}
          labelSkipHeight={12}
          labelTextColor={{
              from: 'color',
              modifiers: [
                  [
                      'darker',
                      '4'
                  ]
              ]
          }}
          // legends={[]}
          tooltip={barTooltip}
          role="application"
          ariaLabel="Nivo bar chart demo"
          barAriaLabel={function(e){return e.id+": "+e.formattedValue+" exp: "+e.indexValue}}
        />
      </div>
      

      <ThemeProvider theme={myTheme}>
        <Stack direction='column' spacing={1}>
        </Stack>
      </ThemeProvider>
    </Box>

  );
};

export default LevelStatistic;