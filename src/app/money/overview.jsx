import React from 'react';
import styled from 'styled-components';
import { Slate, Title } from '@q/core';
import { purple } from '@q/colors';
// ----------------------------------
// STYLES
// ----------------------------------
const OverviewSlate = styled(Slate)`
  height: calc(100% - 22px);
  margin-left: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
// ----------------------------------
// COMPONENTS
// ----------------------------------
export default function MoneyOverview() {
  return (
    <OverviewSlate color={purple}>
      <Title>Money Overview</Title>
    </OverviewSlate>
  );
}
