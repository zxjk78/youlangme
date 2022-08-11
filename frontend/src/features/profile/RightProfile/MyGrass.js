import * as React from 'react';
import { fetchGrass } from './RightProfileAPI';

import { ResponsiveCalendar } from '@nivo/calendar';

// mui
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActionArea,
  CircularProgress,
} from '@mui/material';

// css
import classes from './RightProfile.module.scss';
import { useEffect } from 'react';
import { useState } from 'react';

// const grassDummyData = [

//   {
//     value: 191,
//     day: '2022-01-27',
//   },
// ];

const MyGrass = (props) => {
  
  const userId = props.userId;
  const [grassData, setGrassData] = useState([]);

  const [isLoading, setIsLoading] = useState(true); 

  useEffect(() => {
    (
      async () => {
        const yearGrassData = await fetchGrass(userId);
        console.log(yearGrassData)
        // if (!yearGrassData) {
        //   history.replace({
        //     pathname: '/404',
        //     message: '존재하지 않는 게시물입니다.',
        //   });
        // }
        setGrassData(yearGrassData);
        setIsLoading(false);
      })();

    return () => {
      setIsLoading(true)
    }
  }, [userId]);

  return (
    <>
      { isLoading ? <CircularProgress /> :
      
      <div className={classes.grass_container}>
        <Typography
          gutterBottom
          color="#9BA7AF"
          sx={{
            // color: 'rgba(0, 0, 0, 0.6)',
            fontSize: 16,
            fontWeight: 'bold',
            mb: 0, mt: 1
          }} 
          component="div"
        >
          내 활동
        </Typography>

        <div className={classes.grass_card}>
          <ResponsiveCalendar
            data={grassData}
            from="2022-01-01"
            to="2022-12-31"
            emptyColor="#eeeeee"
            colors={['#61cdbb', '#97e3d5', '#e8c1a0', '#f47560']}
            margin={{ top: 0, right: 0, bottom: 20, left: 30 }}
            // yearSpacing={40}
            monthBorderColor="#ffffff"
            dayBorderWidth={2}
            dayBorderColor="#ffffff"
            legends={[
              {
                anchor: 'bottom-right',
                direction: 'row',
                translateY: 36,
                itemCount: 4,
                itemWidth: 42,
                itemHeight: 36,
                itemsSpacing: 14,
                itemDirection: 'right-to-left',
              },
            ]}
          />
        </div>
      </div>
      }
    </>
  );
};

export default MyGrass;
