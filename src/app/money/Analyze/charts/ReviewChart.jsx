import * as React from 'react';
import {
  AreaChart, Area, Tooltip, ResponsiveContainer,
} from 'recharts';
import { green, yellow, red } from '@q/colors';
import CustomTooltip from './components';
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
// ----------------------------------
// COMPONENTS
// ----------------------------------
const ReviewChart = (props) => {
  const { data, height } = props;
  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart width={400} height={400} data={data}>
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
        <Tooltip content={<CustomTooltip data={data} />} />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default ReviewChart;
