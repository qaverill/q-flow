import * as React from 'react';
import styled from 'styled-components';
import { dark } from '../../colors';
import { ScrollCSS } from '../styles';
// ----------------------------------
// HELPERS
// ----------------------------------
const SLATE_BORDER = 5;
// ----------------------------------
// STYLES
// ----------------------------------
const SlateBorder = styled.div`
  display: flex;
  flex-grow: 1;
  margin: 1em;

  background-color: ${dark};
  border: ${SLATE_BORDER}px solid ${(props) => props.color};
  border-radius: 15px;
  ${(props) => props.onClick && 'cursor: pointer;'}
  transition: all 250ms ease-in;
  :hover {
    flex-grow: 10;
  }

  overflow: auto;
`;
const SlateDiv = styled.div`
  display: flex;
  flex-grow: 1;
  ${ScrollCSS}
`;
// ----------------------------------
// COMPONENTS
// ----------------------------------
const Slate = (props) => {
  const { children } = props;
  return (
    <SlateBorder {...props}>
      <SlateDiv>
        {children}
      </SlateDiv>
    </SlateBorder>
  );
};

export default Slate;
