import React from 'react';
import styled from 'styled-components';
import { Slate, Title } from '@q/core';
import { blue } from '@q/colors';
// ----------------------------------
// STYLES
// ----------------------------------
const OverviewSlate = styled(Slate)`
  height: calc(100% - 22px);
  margin-right: 3px;
`;
// ----------------------------------
// COMPONENTS
// ----------------------------------
export default function MusicOverview() {
  return (
    <OverviewSlate color={blue}>
      <Title>Music Overview</Title>
    </OverviewSlate>
  );
}
