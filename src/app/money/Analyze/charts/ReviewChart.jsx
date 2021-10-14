import * as React from 'react';
import * as R from 'ramda';
import {
  AreaChart, Area, Tooltip, ResponsiveContainer,
} from 'recharts';
import { green, yellow, red } from '@q/colors';
import { timestampToMonthString } from '@q/time';
import CustomTooltip from './components';
import { fetchAnalysis } from '../../api';
// ----------------------------------
// HELPERS
// ----------------------------------
const type = 'monotone';
const fillOpacity = 0.5;
const dataPoints = [
  { dataKey: 'incoming', color: green },
  { dataKey: 'outcoming', color: red },
  { dataKey: 'delta', color: yellow },
];
const buildChartData = (analysis) => {
  const reviewData = [];
  R.keys(analysis)
    .forEach((timestamp) => {
      const { incoming, outcoming, delta } = analysis[timestamp];
      const month = timestampToMonthString(timestamp);
      reviewData.push({
        month, incoming, outcoming, delta,
      });
    });
  return reviewData;
};
// ----------------------------------
// COMPONENTS
// ----------------------------------
const ReviewChart = (props) => {
  const { height } = props;
  const [reviewData, setReviewData] = React.useState([]);
  console.log({ reviewData });
  React.useEffect(() => {
    fetchAnalysis().then(R.compose(
      setReviewData,
      buildChartData,
    ));
  }, []);
  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart width={400} height={400} data={reviewData}>
        {dataPoints.map(({ dataKey, color }) => (
          <Area
            key={dataKey}
            type={type}
            dataKey={dataKey}
            stroke={color}
            fillOpacity={fillOpacity}
            fill={color}
          />
        ))}
        <Tooltip content={<CustomTooltip data={reviewData} />} />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default ReviewChart;
