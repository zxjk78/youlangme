import * as React from 'react';
import { ResponsivePie } from '@nivo/pie'

// mui
import { Card, CardContent, CardMedia, Typography, CardActionArea } from '@mui/material';

// css
import classes from './RightProfile.module.scss'



const data = [
  {
    "id": "English",
    "label": "English",
    "value": 36,
    "color": "hsl(334, 70%, 50%)"
  },
  {
    "id": "Korean",
    "label": "Korean",
    "value": 18,
    "color": "hsl(215, 70%, 50%)"
  },
  {
    "id": "Japanese",
    "label": "Japanese",
    "value": 8,
    "color": "hsl(148, 70%, 50%)"
  },
  {
    "id": "Spanish",
    "label": "Spanish",
    "value": 4,
    "color": "hsl(303, 70%, 50%)"
  },

]



const MyActivity = () => {
  return (
    <div className={classes.activity_container}>
      <Typography gutterBottom color="#9BA7AF" 
      sx={{
        // color: 'rgba(0, 0, 0, 0.6)',
        fontSize: 16,
        fontWeight: 'bold',
      }} component="div">
        내 활동
      </Typography>

      <div
        className={classes.activity_card}  
        >

        <div  className={classes.my_activity}  
        // sx={{ height: '300px', width: '100%', p:0 }}
        >
          <ResponsivePie
            data={data}
            margin={{ top: 0, right: 30, bottom: 70, left: 20 }}
            startAngle={-149}
            innerRadius={0.5}
            cornerRadius={3} 
            padAngle={0.7}
            sortByValue={true}
            activeOuterRadiusOffset={8}
            borderWidth={1}
            borderColor={{
                from: 'color',
                modifiers: [
                    [
                        'darker',
                        0.2
                    ]
                ]
            }}
            arcLinkLabelsSkipAngle={10}
            arcLinkLabelsTextColor="#333333"
            // arcLinkLabelsDiagonalLength={12}
            arcLinkLabelsThickness={2}
            arcLinkLabelsColor={{ from: 'color' }}
            arcLabelsSkipAngle={10}
            arcLabelsTextColor={{
                from: 'color',
                modifiers: [
                    [
                        'darker',
                        '1.1'
                    ]
                ]
            }}
            defs={[
                // {
                //     id: 'dots',
                //     type: 'patternDots',
                //     background: 'inherit',
                //     color: 'rgba(255, 255, 255, 0.3)',
                //     size: 2,
                //     // padding: 1,
                //     stagger: true
                // },
                // {
                //     id: 'lines',
                //     type: 'patternLines',
                //     background: 'inherit',
                //     color: 'rgba(255, 255, 255, 0.3)',
                //     rotation: -45,
                //     lineWidth: 6,
                //     spacing: 10
                // }
            ]}
            fill={[
                // {
                //     match: {
                //         id: 'Korean'
                //     },
                //     id: 'lines'
                // },
                // {
                //     match: {
                //         id: 'English'
                //     },
                //     id: 'dots'
                // },
                // {
                //     match: {
                //         id: 'Japanese'
                //     },
                //     id: 'lines'
                // },
                // {
                //     match: {
                //         id: 'Spanish'
                //     },
                //     id: 'lines'
                // },
            ]}
            legends={[
                {
                    anchor: 'bottom',
                    direction: 'row',
                    justify: false,
                    translateX: 0,
                    translateY: 60,
                    itemsSpacing: 18,
                    itemWidth: 68,
                    itemHeight: 10,
                    itemTextColor: '#999',
                    itemDirection: 'left-to-right',
                    itemOpacity: 1,
                    symbolSize: 18,
                    symbolShape: 'circle',
                    effects: [
                        {
                            on: 'hover',
                            style: {
                                itemTextColor: '#000'
                            }
                        }
                    ]
                }
            ]}
          />
                {/* <Typography gutterBottom color="#9BA7AF" variant="h3" component="span">Lv.</Typography>
          <Typography gutterBottom color="#FFC700" variant="h3" component="span">36</Typography> */}
        </div>
      </div>
    </div>

  )
}


export default MyActivity


