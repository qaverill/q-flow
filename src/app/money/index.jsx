import * as React from 'react';
import {
  Switch,
  Route,
  NavLink,
} from 'react-router-dom';
import styled from 'styled-components';
import { Slate, Title } from '@q/core';
import { purple } from '@q/colors';
import { startOfCurrentMonth, now } from '@q/utils';
import { TimeframeFilterProvider, TimeframeFilter } from '@q/timeframe-filter';
import Audit, { AuditProvider } from './Audit';
import Analyze from './Analyze';
// ----------------------------------
// HELPERS
// ----------------------------------
// ----------------------------------
// STYLES
// ----------------------------------
const MoneyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;
const HomeContainer = styled.div``;
// ----------------------------------
// COMPONENTS
// ----------------------------------
const MoneyHome = () => (
  <HomeContainer>
    <NavLink to="/money/audit">
      <Title>Audit</Title>
    </NavLink>
    <NavLink to="/money/analyze">
      <Title>Analyze</Title>
    </NavLink>
  </HomeContainer>
);
const Money = () => {
  const initStart = startOfCurrentMonth();
  const initEnd = now();
  return (
    <Slate color={purple}>
      <TimeframeFilterProvider initStart={initStart} initEnd={initEnd}>
        <MoneyWrapper>
          <TimeframeFilter color={purple} />
          <Switch>
            <Route path="/money/audit">
              <AuditProvider>
                <Audit />
              </AuditProvider>
            </Route>
            <Route path="/money/analyze">
              <Analyze />
            </Route>
            <Route path="/money">
              <MoneyHome />
            </Route>
          </Switch>
        </MoneyWrapper>
      </TimeframeFilterProvider>
    </Slate>
  );
};

export default Money;
