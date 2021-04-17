import * as React from 'react';
import * as R from 'ramda';
import styled from 'styled-components';
import {
  AreaChart, Area, Tooltip, XAxis, YAxis, ResponsiveContainer,
} from 'recharts';
import { timestampToMonthString } from '@q/time';
import {
  green, yellow, red, purple,
} from '@q/colors';
import { Slate, Title } from '@q/core';
import { fetchAnalysis } from '../api';
// ----------------------------------
// HELPERS
// ----------------------------------
const buildChartData = (analysis) => R.keys(analysis).map((timestamp) => {
  const { incoming, outcoming, delta } = analysis[timestamp];
  const month = timestampToMonthString(timestamp);
  return {
    month, incoming, outcoming, delta,
  };
});

// ----------------------------------
// STYLES
// ----------------------------------
const TooltopContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 5px;
`;
const TooltipItem = styled(Title)`
  margin: 5px 0;
`;
// ----------------------------------
// COMPONENTS
// ----------------------------------
const CustomTooltip = (props) => {
  const { payload, label, active } = props;
  if (active) {
    return (
      <Slate color={purple}>
        <TooltopContainer>
          <TooltipItem>{label}</TooltipItem>
          {payload.map(({ color, name, value }) => (
            <TooltipItem key={name} color={color}>
              {`${name}: ${value}`}
            </TooltipItem>
          ))}
        </TooltopContainer>
      </Slate>
    );
  }
  return null;
};
const Analyze = (props) => {
  const [data, setData] = React.useState([]);
  function loadChartData() {
    fetchAnalysis().then(R.compose(
      setData,
      buildChartData,
    ));
  }
  React.useEffect(loadChartData, []);
  return (
    <ResponsiveContainer width="100%" height="20%">
      <AreaChart width={400} height={400} data={data}>
        <Area type="monotone" dataKey="incoming" stroke={green} fillOpacity={0.5} fill={green} />
        <Area type="monotone" dataKey="outcoming" stroke={red} fillOpacity={0.5} fill={red} />
        <Area type="monotone" dataKey="delta" stroke={yellow} fillOpacity={0.5} fill={yellow} />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip content={<CustomTooltip />} />
      </AreaChart>

    </ResponsiveContainer>
  );
};

export default Analyze;
