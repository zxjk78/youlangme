import * as React from 'react';
import { useState, useEffect } from 'react';

import { fetchLanguageStat } from './RightProfileAPI';

import { ResponsivePie } from '@nivo/pie'
import { BasicTooltip } from '@nivo/tooltip';

// mui
import { Card, CardContent, CardMedia,
  Typography, CardActionArea, CircularProgress } from '@mui/material';

// css
import classes from './RightProfile.module.scss'




// [
//   {
//     "id": "English",
//     // "label": "English",
//     "value": 36,
//     // "color": "hsl(334, 70%, 50%)"
//   },
//   {
//     "id": "Korean",
//     "label": "Korean",
//     "value": 18,
//     // "color": "hsl(215, 70%, 50%)"
//   },
//   {
//     "id": "Japanese",
//     "label": "Japanese",
//     "value": 8,
//     // "color": "hsl(148, 70%, 50%)"
//   },
//   {
//     "id": "Spanish",
//     "label": "Spanish",
//     "value": 4,
//     // "color": "hsl(303, 70%, 50%)"
//   },
  
// ]



const MyLanguages = (props) => {
  const userId = props.userId;
  
  
  
  const [languageStat, setLanguageStat] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const languageStatData = []; 

  const pieTooltip = (item) => {

    // tooltip={function(e){
    //   var t=e.datum;
      // return(0,a.jsxs)(s,{style:{color:t.color},children:[(0,a.jsx)
      // (d,{children:"id"}),(0,a.jsx)(c,{children:t.id}),(0,a.jsx)(d,{children:"value"}),(0,a.jsx)(c,{children:t.value}),(0,a.jsx)
      // (d,{children:"formattedValue"}),(0,a.jsx)(c,{children:t.formattedValue}),(0,a.jsx)(d,{children:"color"}),(0,a.jsx)(c,{children:t.color})]})}}

    return (
        <BasicTooltip
          id={item.datum.id}
          value={` ${item.datum.value} 분 ` }
          color={item.datum.color}
          enableChip
        >
        </BasicTooltip>
        );
      };

  useEffect(() => {
    (
      async () => {
        const getLanguageStat = await fetchLanguageStat(userId);
        
        setLanguageStat(getLanguageStat);
        setIsLoading(false);
      })();
      
      return () => {
        setIsLoading(true)
      }
    }, [userId]);
    


    console.log(languageStat)
    for (const lng in languageStat) {
      languageStatData.push(
        {
          "id": lng,
          // "value": parseInt(languageStat[lng] / 60),
          "value": languageStat[lng],
        }
      )
    }
    return (
    <>
      { isLoading ? <CircularProgress /> : 
    
      <div className={classes.activity_container}>
        <Typography gutterBottom color="#9BA7AF" 
        sx={{
          // color: 'rgba(0, 0, 0, 0.6)',
          fontSize: 16,
          fontWeight: 'bold',
        }} component="div">
          내 언어
        </Typography>

        <div
          className={classes.activity_card}  
          >

          <div  className={classes.my_activity}  
          // sx={{ height: '300px', width: '100%', p:0 }}
          >
            <ResponsivePie
              data={languageStatData}
              margin={{ top: 15, right: 30, bottom: 20, left: 0 }}
              startAngle={-20}
              innerRadius={0.5}
              cornerRadius={3} 
              padAngle={0.7}
              sortByValue={true}
              activeOuterRadiusOffset={8}
              colors={{ scheme: 'accent' }}
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
              enableArcLinkLabels={false}
              arcLinkLabelsSkipAngle={10}
              arcLinkLabelsTextColor="#333333"
              // arcLinkLabelsDiagonalLength={12}
              arcLinkLabelsThickness={2}
              arcLinkLabelsColor={{ from: 'color' }}
              arcLabel={function(e){return e.value+" 분"}}
              arcLabelsSkipAngle={10}
              arcLabelsTextColor="#f8f2f2"
              // arcLabelsTextColor={{
              //     from: 'color',
              //     modifiers: [
              //         [
              //             'darker',
              //             '1.1'
              //         ]
              //     ]
              // }}
              tooltip={pieTooltip}
              legends={[
                  {
                      anchor: 'right',
                      direction: 'column',
                      justify: false,
                      translateX: -30,
                      translateY: 50,
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
      }
    </>

  )
}


export default MyLanguages;


