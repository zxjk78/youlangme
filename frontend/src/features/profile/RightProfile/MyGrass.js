import * as React from 'react';
import { ResponsiveCalendar } from '@nivo/calendar';

// mui
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActionArea,
} from '@mui/material';

// css
import classes from './RightProfile.module.scss';

const grassDummyData = [
  {
    value: 214,
    day: '2021-05-08',
  },
  {
    value: 209,
    day: '2022-09-07',
  },
  {
    value: 13,
    day: '2022-04-12',
  },
  {
    value: 286,
    day: '2022-07-31',
  },
  {
    value: 164,
    day: '2022-11-10',
  },
  {
    value: 281,
    day: '2022-03-14',
  },
  {
    value: 290,
    day: '2022-09-13',
  },
  {
    value: 5,
    day: '2022-07-04',
  },
  {
    value: 320,
    day: '2022-07-26',
  },
  {
    value: 322,
    day: '2022-06-01',
  },
  {
    value: 378,
    day: '2022-11-25',
  },
  {
    value: 142,
    day: '2022-11-05',
  },
  {
    value: 4,
    day: '2022-09-06',
  },
  {
    value: 162,
    day: '2022-07-03',
  },
  {
    value: 238,
    day: '2022-02-23',
  },
  {
    value: 81,
    day: '2022-06-27',
  },
  {
    value: 236,
    day: '2022-06-18',
  },
  {
    value: 366,
    day: '2022-07-17',
  },
  {
    value: 353,
    day: '2022-03-18',
  },
  {
    value: 41,
    day: '2022-06-21',
  },
  {
    value: 270,
    day: '2022-04-06',
  },
  {
    value: 387,
    day: '2022-09-19',
  },
  {
    value: 191,
    day: '2022-01-27',
  },
];

const MyGrass = (props) => {
  return (
    <div className={classes.grass_container}>
      {/* 레벨 클릭하면 모달창!!!!!!!!!!!!!!!!!!!!!!!!!! */}
      <Typography
        gutterBottom
        color="#9BA7AF"
        variant="h6"
        component="div"
        sx={{ mb: 0, mt: 1 }}
      >
        내 활동
      </Typography>

      <div className={classes.grass_card}>
        <ResponsiveCalendar
          data={grassDummyData}
          from="2022-01-01"
          to="2022-12-31"
          emptyColor="#eeeeee"
          colors={['#61cdbb', '#97e3d5', '#e8c1a0', '#f47560']}
          margin={{ top: 0, right: 0, bottom: 50, left: 30 }}
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
  );
};

export default MyGrass;
