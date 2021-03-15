import React from 'react';
import {
  Switch,
  Route,
  useLocation,
  useHistory,
} from 'react-router-dom';
import { Slate, Title } from '../../packages/core';
import { green } from '../../packages/colors';
import Overview from './overview';

// ----------------------------------
// STYLES
// ----------------------------------

// ----------------------------------
// COMPONENTS
// ----------------------------------
export default function Music() {
  const { pathname } = useLocation();
  const history = useHistory();
  const isOverview = pathname === '/';
  const leaveOverview = () => history.replace('/music');
  return (
    <Slate rimColor={green} onClick={isOverview ? leaveOverview : null} left={isOverview}>
      <Switch>
        <Route path="/music/audit">
          <Title>AUDIT</Title>
        </Route>
        <Route path="/music/analyze">
          <Title>ANALYZE</Title>
        </Route>
        <Route path="/music">
          <Title>MUSIC PAGE</Title>
        </Route>
        <Route exact path="/">
          <Overview />
        </Route>
      </Switch>
    </Slate>
  );
}