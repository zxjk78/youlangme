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
    "value": 352,
    "color": "hsl(334, 70%, 50%)"
  },
  {
    "id": "Korean",
    "label": "Korean",
    "value": 105,
    "color": "hsl(215, 70%, 50%)"
  },
  {
    "id": "Japanese",
    "label": "Japanese",
    "value": 32,
    "color": "hsl(148, 70%, 50%)"
  },
  {
    "id": "Spanish",
    "label": "Spanish",
    "value": 112,
    "color": "hsl(303, 70%, 50%)"
  },
  // {
  //   "id": "c",
  //   "label": "c",
  //   "value": 267,
  //   "color": "hsl(299, 70%, 50%)"
  // }
]



const MyActivity = () => {
  return (
    <div className={classes.container}>
      <Typography gutterBottom color="#9BA7AF" variant="h5" component="div">
        내 활동
      </Typography>

      <Card 
        className={classes.activity_card}  
        sx={{ m:4 }}
         >

        <CardContent sx={{ height: '300px', width: '100%' }}>
          <ResponsivePie
            data={data}
            margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
            startAngle={-149}
            innerRadius={0.5}
            padAngle={0.7}
            cornerRadius={3}
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
            arcLinkLabelsThickness={2}
            arcLinkLabelsColor={{ from: 'color' }}
            arcLabelsSkipAngle={10}
            arcLabelsTextColor={{
                from: 'color',
                modifiers: [
                    [
                        'darker',
                        2
                    ]
                ]
            }}
            defs={[
                {
                    id: 'dots',
                    type: 'patternDots',
                    background: 'inherit',
                    color: 'rgba(255, 255, 255, 0.3)',
                    size: 2,
                    // padding: 1,
                    stagger: true
                },
                {
                    id: 'lines',
                    type: 'patternLines',
                    background: 'inherit',
                    color: 'rgba(255, 255, 255, 0.3)',
                    rotation: -45,
                    lineWidth: 6,
                    spacing: 10
                }
            ]}
            fill={[
                // {
                //     match: {
                //         id: 'Korean'
                //     },
                //     id: 'dots'
                // },
                // // {
                // //     match: {
                // //         id: 'c'
                // //     },
                // //     id: 'dots'
                // // },
                // {
                //     match: {
                //         id: 'go'
                //     },
                //     id: 'dots'
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
                // {
                //     match: {
                //         id: 'elixir'
                //     },
                //     id: 'lines'
                // },
                // {
                //     match: {
                //         id: 'javascript'
                //     },
                //     id: 'lines'
                // }
            ]}
            legends={[
                {
                    anchor: 'bottom',
                    direction: 'row',
                    justify: false,
                    translateX: 0,
                    translateY: 56,
                    itemsSpacing: 0,
                    itemWidth: 100,
                    itemHeight: 18,
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
        </CardContent>
      </Card>
    </div>

  )
}


export default MyActivity


