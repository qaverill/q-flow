import React from 'react';
import {
  Switch,
  Route,
  useLocation,
  useHistory,
} from 'react-router-dom';
import { Slate, Title } from '../../packages/core';
import { purple } from '../../packages/colors';
import Overview from './overview';
import Audit from './Audit';
// ----------------------------------
// STYLES
// ----------------------------------

// ----------------------------------
// COMPONENTS
// ----------------------------------
const  Money = () => {
  const { pathname } = useLocation();
  const history = useHistory();
  const isOverview = pathname === '/';
  const leaveOverview = () => history.replace('/money');
  return (
    <Slate rimColor={purple} onClick={isOverview ? leaveOverview : null} left={isOverview}>
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
    </Slate>
  );
}

export default Money;
