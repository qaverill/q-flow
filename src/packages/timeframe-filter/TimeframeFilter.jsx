import * as React from 'react';
import styled from 'styled-components';
import { useTimeframeFilter } from './TimeframeFilterProvider';
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
  height: 2em;
  padding-bottom: 5px;
  background-color: ${(props) => props.color || 'white'};
`;
// ----------------------------------
// COMPONENTS
// ----------------------------------
const TimeframeFilter = (props) => {
  const { color } = props;
  const { start, end, setStart, setEnd } = useTimeframeFilter();
  return (
    <TimeframeFilterContainer color={color}>
      TODO: TIMEFRAME
    </TimeframeFilterContainer>
  );
};

export default TimeframeFilter;
