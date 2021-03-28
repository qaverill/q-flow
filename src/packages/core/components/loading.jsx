import React from 'react';
import styled from 'styled-components';
import ClipLoader from 'react-spinners/ClipLoader';
import { green } from '../../colors';
// ----------------------------------
// STYLES
// ----------------------------------
const FullDiv = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
// ----------------------------------
// COMPONENT
// ----------------------------------
const Loading = ({ color, size }) => (
  <FullDiv>
    <ClipLoader sizeUnit="px" size={size || 100} color={color || green} />
  </FullDiv>
);

export default Loading;
