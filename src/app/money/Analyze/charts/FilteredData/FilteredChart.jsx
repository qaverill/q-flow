import * as React from 'react';
import {
  LineChart, Line, Tooltip, ResponsiveContainer,
} from 'recharts';
import CustomTooltip from '../CustomTooltip';
// ----------------------------------
// HELPERS
// ----------------------------------
const type = 'monotone';
const fillOpacity = 0.5;
// ----------------------------------
// COMPONENTS
// ----------------------------------
const FilteredData = (props) => {
  const {
    data,
    dataPoints,
    width = '100%',
    height = '100%',
    highlightedDataKey,
  } = props;
  return (
    <ResponsiveContainer width={width} height={height} debounce={800}>
      <LineChart width={400} height={400} data={data}>
        {dataPoints.map((dataPoint) => {
          const { dataKey, color } = dataPoint;
          const strokeWidth = highlightedDataKey != null && highlightedDataKey !== dataKey ? 0 : 3;
          return (
            <Line
              key={dataKey}
              type={type}
              dataKey={dataKey}
              stroke={color}
              fillOpacity={fillOpacity}
              dot={false}
              strokeWidth={strokeWidth}
            />
          );
        })}
        <Tooltip content={<CustomTooltip data={data} highlightedDataKey={highlightedDataKey} />} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default FilteredData;
