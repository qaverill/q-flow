import * as React from 'react';
import * as R from 'ramda';
import styled from 'styled-components';
import { timestampToMonthString } from '@q/time';
import { fetchAnalysis } from '../api';
import ReviewChart from './charts/ReviewChart';
import BreakdownChart from './charts/BreakdownChart';
// ----------------------------------
// HELPERS
// ----------------------------------
const buildChartData = (analysis) => {
  const reviewData = [];
  const breakdownData = [];
  R.keys(analysis)
    .forEach((timestamp) => {
      const {
        incoming,
        outcoming,
        delta,
        tags,
      } = analysis[timestamp];
      const month = timestampToMonthString(timestamp);
      reviewData.push({ month, incoming, outcoming, delta });
      breakdownData.push({ month, ...tags });
    });
  return { reviewData, breakdownData };
};
// ----------------------------------
// STYLES
// ----------------------------------
const reviewChartHeight = '20%';
const breakdownChartHeight = '80%';
const AnalyzeWrapper = styled.div`
  width: 100%;
  height: 100%;
`;
// ----------------------------------
// COMPONENTS
const Analyze = () => {
  const [data, setData] = React.useState({});
  const { reviewData, breakdownData } = data;
  function loadChartData() {
    fetchAnalysis().then(R.compose(
      setData,
      buildChartData,
    ));
  }
  React.useEffect(loadChartData, []);
  return (
    <AnalyzeWrapper>
      {reviewData && <ReviewChart data={reviewData} height={reviewChartHeight} />}
      {breakdownData && <BreakdownChart data={breakdownData} height={breakdownChartHeight} />}
    </AnalyzeWrapper>
  );
};

export default Analyze;
