import * as React from 'react';
import styled from 'styled-components';
import { Title } from '@q/core';
// ----------------------------------
// STYLES
// ----------------------------------
const FilteredDataLegendWrapper = styled.div`
  widht: 20%;
  height: 100%;
`;
const LegendTitle = styled(Title)`
  margin-top: 30px;
  cursor: pointer;
  padding: 5px;
  ${(props) => props.isHighlighted && 'border-radius: 22px;'}
  ${(props) => props.isHighlighted && 'border: 5px white solid;'}
`;
// ----------------------------------
// COMPONENTS
// ----------------------------------
const LegendItem = (props) => {
  const { dataPoint, highlightedDataKey, setHighlightedDataKey } = props;
  const { dataKey, color } = dataPoint;
  const isHighlighted = highlightedDataKey === dataKey;
  function highlightDataKey() {
    const newHighlightedDataKey = isHighlighted ? null : dataKey;
    setHighlightedDataKey(newHighlightedDataKey);
  }
  return (
    <LegendTitle
      color={color}
      onClick={highlightDataKey}
      isHighlighted={isHighlighted}
    >
      {dataKey}
    </LegendTitle>
  );
};
const FilteredDataLegend = (props) => {
  const { dataPoints, highlightedDataKey, setHighlightedDataKey } = props;
  return (
    <FilteredDataLegendWrapper>
      {dataPoints.map((dataPoint) => (
        <LegendItem
          key={dataPoint.dataKey}
          dataPoint={dataPoint}
          highlightedDataKey={highlightedDataKey}
          setHighlightedDataKey={setHighlightedDataKey}
        />
      ))}
    </FilteredDataLegendWrapper>
  );
};

export default FilteredDataLegend;
