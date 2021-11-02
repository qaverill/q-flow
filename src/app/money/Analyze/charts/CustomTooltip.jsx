import * as React from 'react';
import styled from 'styled-components';
import { purple } from '@q/colors';
import { Slate, Title } from '@q/core';
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
  const {
    data,
    payload,
    label,
    active,
    highlightedDataKey,
  } = props;
  if (active) {
    const { month } = data[label];
    const processedPayload = highlightedDataKey == null
      ? payload
      : payload.filter((d) => d.dataKey === highlightedDataKey);
    return (
      <Slate color={purple}>
        <TooltopContainer>
          <TooltipItem>{month}</TooltipItem>
          {processedPayload.map(({ color, name, value }) => (
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

export default CustomTooltip;
