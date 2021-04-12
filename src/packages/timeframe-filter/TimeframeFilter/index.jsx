import * as React from 'react';
import styled from 'styled-components';
import { TextInput, DateInput } from '@q/core';
import { useTimeframeFilter } from '../TimeframeFilterProvider';
// ----------------------------------
// HELPERS
// ----------------------------------
// ----------------------------------
// STYLES
// ----------------------------------
const TimeframeFilterContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-shrink: 0;
  padding-bottom: 3px;
  margin: -9px -6px 0 -6px;
  background-color: ${(props) => props.color || 'white'};
`;
// ----------------------------------
// COMPONENTS
// ----------------------------------
const TimeframeFilter = (props) => {
  const { color } = props;
  const {
    start, end, setStart, setEnd, setFilter,
  } = useTimeframeFilter();
  return (
    <TimeframeFilterContainer color={color}>
      <DateInput onChange={setStart} value={start} />
      <TextInput onChange={setFilter} />
      <DateInput onChange={setEnd} value={end} />
    </TimeframeFilterContainer>
  );
};

export default TimeframeFilter;
