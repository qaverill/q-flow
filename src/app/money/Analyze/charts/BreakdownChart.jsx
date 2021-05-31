import * as React from 'react';
import * as R from 'ramda';
import {
  LineChart, Line, Tooltip, ResponsiveContainer,
} from 'recharts';
import { blue, orange, pink, purple, green, yellow, red } from '@q/colors';
import CustomTooltip from './components';
// ----------------------------------
// HELPERS
// ----------------------------------
const type = 'monotone';
const fillOpacity = 0.5;
const colors = [blue, orange, pink, purple, red, yellow, green];
const determineDataPoints = (data) => {
  const example = data[0];
  const keys = R.keys(example);
  return keys.filter((key) => {
    if (key === 'month') return false;
    if (example[key] > 0) return false;
    return true;
  });
};
// ----------------------------------
// COMPONENTS
// ----------------------------------
const ReviewChart = (props) => {
  const { data, height } = props;
  const dataPoints = determineDataPoints(data);
  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart width={400} height={400} data={data}>
        {dataPoints.map((dataKey, index) => {
          const color = colors[index];
          return (
            <Line
              key={dataKey}
              type={type}
              dataKey={dataKey}
              stroke={color}
              fillOpacity={fillOpacity}
              dot={false}
              strokeWidth={3}
            />
          );
        })}
        <Tooltip content={<CustomTooltip data={data} />} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default ReviewChart;
