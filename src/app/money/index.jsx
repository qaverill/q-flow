import React from 'react';
import {
  Switch,
  Route,
  useLocation,
  useHistory,
} from 'react-router-dom';
import styled from 'styled-components';
import { Slate, Title } from '@q/core';
import { purple } from '@q/colors';
import { TimeframeFilterProvider, TimeframeFilter } from '@q/timeframe-filter';
import Overview from './overview';
import Audit from './Audit';
// ----------------------------------
// STYLES
// ----------------------------------
const MoneyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
// ----------------------------------
// COMPONENTS
// ----------------------------------
const Money = () => {
  const { pathname } = useLocation();
  const history = useHistory();
  const isOverview = pathname === '/';
  const leaveOverview = () => history.replace('/money');
  return (
    <Slate color={purple} onClick={isOverview ? leaveOverview : null} left={isOverview}>
      <TimeframeFilterProvider>
        <MoneyWrapper>
          <TimeframeFilter />
          <Switch>
            <Route path="/money/audit">
              <Title>AUDIT</Title>
            </Route>
            <Route path="/money/analyze">
              <Title>ANALYZE</Title>
            </Route>
            <Route path="/money">
              <Audit />
            </Route>
            <Route exact path="/">
              <Overview />
            </Route>
          </Switch>
        </MoneyWrapper>
      </TimeframeFilterProvider>
    </Slate>
  );
};

export default Money;
