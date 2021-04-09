import * as React from 'react';
import styled from 'styled-components';
import { TextInput } from '@q/core';
import { timestampToString, stringToTimestamp } from '@q/utils';
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
  justify-content: center;
  flex-shrink: 0;
  width: 100%;
  padding-bottom: 5px;
  background-color: ${(props) => props.color || 'white'};
`;
const DateSelector = styled(TextInput)`
  width: 100px;
`;
// ----------------------------------
// COMPONENTS
// ----------------------------------
const TimeframeFilter = (props) => {
  const { color } = props;
  const {
    start, end, setStart, setEnd,
  } = useTimeframeFilter();
  const startString = timestampToString(start);
  const endString = timestampToString(end);
  function handleStartChange(value) {
    const timestamp = stringToTimestamp(value);
    setStart(timestamp);
  }
  function handleEndChange(value) {
    const timestamp = stringToTimestamp(value);
    setEnd(timestamp);
  }
  return (
    <TimeframeFilterContainer color={color}>
      <DateSelector onChange={handleStartChange} value={startString} />
      TODO: TIMEFRAME
      <DateSelector onChange={handleEndChange} value={endString} />
    </TimeframeFilterContainer>
  );
};

export default TimeframeFilter;
