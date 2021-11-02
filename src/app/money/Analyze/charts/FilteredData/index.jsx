import * as React from 'react';
import * as R from 'ramda';
import { timestampToMonthString } from '@q/time';
import styled from 'styled-components';
import {
  blue, orange, pink, purple, green, yellow, red,
} from '@q/colors';
import { fetchAnalysis } from '../../../api';
import FilteredChart from './FilteredChart';
import FilteredDataLegend from './FilteredDataLegend';
// ----------------------------------
// HELPERS
// ----------------------------------
const determineDataPoints = (data) => {
  let keyIndex = 0;
  const dataPoints = [];
  const colors = [blue, orange, pink, purple, red, yellow, green];
  R.keys(data[0]).forEach((key) => {
    if (key !== 'month') {
      dataPoints.push({
        dataKey: key,
        color: colors[keyIndex],
      });
      keyIndex += 1;
    }
  });
  return dataPoints;
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
// STYLES
// ----------------------------------
const FilteredDataWrapper = styled.div`
  display: flex;
  width: 100%;
  height: ${(props) => props.height};
  ${(props) => !props.expanded && 'cursor: pointer;'}
`;
// ----------------------------------
// COMPONENTS
// ----------------------------------
const FilteredData = (props) => {
  const {
    height,
    filter,
    expanded,
    setFilterToExpand,
  } = props;
  const [data, setData] = React.useState([]);
  const [highlightedDataKey, setHighlightedDataKey] = React.useState(null);
  const totalHeight = expanded ? '100%' : height;
  const chartWidth = expanded ? '80%' : '100%';
  const dataPoints = determineDataPoints(data);
  function expandData() {
    setFilterToExpand(filter);
  }
  React.useEffect(() => {
    fetchAnalysis(filter).then(R.compose(
      setData,
      buildChartData,
    ));
  }, []);
  return (
    <FilteredDataWrapper onClick={expandData} height={totalHeight} expanded={expanded}>
      <FilteredChart
        data={data}
        dataPoints={dataPoints}
        width={chartWidth}
        highlightedDataKey={highlightedDataKey}
      />
      {expanded && (
        <FilteredDataLegend
          dataPoints={dataPoints}
          highlightedDataKey={highlightedDataKey}
          setHighlightedDataKey={setHighlightedDataKey}
        />
      )}
    </FilteredDataWrapper>
  );
};

export default FilteredData;
