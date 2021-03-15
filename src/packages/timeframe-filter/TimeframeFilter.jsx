import * as React from 'react';
import styled from 'styled-components';
import { useTimeframeFilterProvider } from './TimeframeFilterProvider';
// ----------------------------------
// HELPERS
// ----------------------------------
// ----------------------------------
// STYLES
// ----------------------------------
const TimeframeFilterContainer = styled.div`
  width: 100%;
  height: 100px;
  background-color: ${(props) => props.color || 'white'};
`;
// ----------------------------------
// COMPONENTS
// ----------------------------------
const TimeframeFilter = (props) => {
  const { color } = props;
  const { start, end, setStart, setEnd } = useTimeframeFilterProvider();
  return (
    <TimeframeFilterContainer color={color}>
      
    </TimeframeFilterContainer>
  );
};

export default TimeframeFilter;
