import * as React from 'react';
import * as R from 'ramda';
import {
  LineChart, Line, Tooltip, ResponsiveContainer,
} from 'recharts';
import {
  blue, orange, pink, purple, green, yellow, red,
} from '@q/colors';
import { timestampToMonthString } from '@q/time';
import CustomTooltip from './components';
import { fetchAnalysis } from '../../api';
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
    return true;
  });
};
const buildChartData = (analysis) => {
  const chartData = [];
  R.keys(analysis)
    .forEach((timestamp) => {
      const { tags } = analysis[timestamp];
      const month = timestampToMonthString(timestamp);
      chartData.push({ month, ...tags });
    });
  return chartData;
};
// ----------------------------------
// COMPONENTS
// ----------------------------------
const IncomeChart = (props) => {
  const { height, filter } = props;
  const [incomeData, setIncomeData] = React.useState([]);
  console.log({[filter]: incomeData})
  React.useEffect(() => {
    fetchAnalysis(filter).then(R.compose(
      setIncomeData,
      buildChartData,
    ));
  }, []);
  const dataPoints = determineDataPoints(incomeData);
  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart width={400} height={400} data={incomeData}>
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
        <Tooltip content={<CustomTooltip data={incomeData} />} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default IncomeChart;
