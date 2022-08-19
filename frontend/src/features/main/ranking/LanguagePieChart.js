// react core

// API

// external module
import _ from 'lodash';
// external component
import { ResponsivePie } from '@nivo/pie';

// custom component

// css
// import classes from './LanguagePieChart.module.scss';

const sampleColor = [
  'hsl(18, 70%, 50%)',
  'hsl(224, 70%, 50%)',
  'hsl(322, 70%, 50%)',
  'hsl(285, 70%, 50%)',
  'hsl(47, 70%, 50%)',
];

const LanguagePieChart = (props) => {
  const rankingData = [];
  const color3pick = _.sampleSize(sampleColor, 3);

  for (let index = 0; index < props.languageRanking.length; index++) {
    const ele = props.languageRanking[index];

    rankingData.push({
      id: ele.language,
      value: ele.percent,
      color: color3pick[index],
    });
  }

  return (
    <>
      <ResponsivePie
        data={rankingData}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        borderWidth={1}
        borderColor={{
          from: 'color',
          modifiers: [['darker', 0.2]],
        }}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor="#333333"
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: 'color' }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{
          from: 'color',
          modifiers: [['darker', 2]],
        }}
        defs={[
          {
            id: 'dots',
            type: 'patternDots',
            background: 'inherit',
            color: 'rgba(255, 255, 255, 0.3)',
            size: 4,
            padding: 1,
            stagger: true,
          },
          {
            id: 'lines',
            type: 'patternLines',
            background: 'inherit',
            color: 'rgba(255, 255, 255, 0.3)',
            rotation: -45,
            lineWidth: 6,
            spacing: 10,
          },
        ]}
        fill={[
          {
            match: {
              id: 'ruby',
            },
            id: 'dots',
          },
          {
            match: {
              id: 'c',
            },
            id: 'dots',
          },
          {
            match: {
              id: 'go',
            },
            id: 'dots',
          },
          {
            match: {
              id: 'python',
            },
            id: 'dots',
          },
          {
            match: {
              id: 'scala',
            },
            id: 'lines',
          },
          {
            match: {
              id: 'lisp',
            },
            id: 'lines',
          },
          {
            match: {
              id: 'elixir',
            },
            id: 'lines',
          },
          {
            match: {
              id: 'javascript',
            },
            id: 'lines',
          },
        ]}
      />
    </>
  );
};
export default LanguagePieChart;
