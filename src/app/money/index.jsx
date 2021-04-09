import * as React from 'react';
import {
  Switch,
  Route,
  useLocation,
  useHistory,
} from 'react-router-dom';
import styled from 'styled-components';
import { Slate, Title } from '@q/core';
import { purple } from '@q/colors';
import { startOfCurrentMonth, now } from '@q/time';
import { TimeframeFilterProvider, TimeframeFilter, useTimeframeFilter } from '@q/timeframe-filter';
import Overview from './overview';
import Audit, { AuditProvider } from './Audit';
// ----------------------------------
// HELPERS
// ----------------------------------
const initializeTimeframe = () => {
  const { setStart, setEnd } = useTimeframeFilter();
  const start = startOfCurrentMonth();
  const end = now();
  setStart(start);
  setEnd(end);
};
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
  function leaveOverview() {
    history.replace('/money');
  }
  React.useEffect(initializeTimeframe, []);
  return (
    <Slate color={purple} onClick={isOverview ? leaveOverview : null} left={isOverview}>
      <TimeframeFilterProvider>
        <MoneyWrapper>
          <TimeframeFilter color={purple} />
          <Switch>
            <Route path="/money/audit">
              <Title>AUDIT</Title>
            </Route>
            <Route path="/money/analyze">
              <Title>ANALYZE</Title>
            </Route>
            <Route path="/money">
              <AuditProvider>
                <Audit />
              </AuditProvider>
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
