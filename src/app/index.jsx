import React from 'react';
import { Switch, Route, useRouteMatch, NavLink } from 'react-router-dom';
import styled from 'styled-components';
import NavigationBar from '@q/navigation';
import { Slate } from '@q/core';
import { orange } from '@q/colors';
import Money from './money';
import MoneyOverview from './money/overview';
import Music from './music';
import MusicOverview from './music/overview';
// ----------------------------------
// STYLES
// ----------------------------------
const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  height: 100%;
`;
const AppSlate = styled(Slate)`
  margin: 10px;
`;
const HomeContainer = styled.div`
  display: flex;
  flex-grow: 1;
`;
const HalfLink = styled(NavLink)`
  display: flex;
  width: 50%;
`;
// ----------------------------------
// COMPONENTS
// ----------------------------------
const Home = () => (
  <HomeContainer>
    <HalfLink to="/music">
      <MusicOverview />
    </HalfLink>
    <HalfLink to="/money">
      <MoneyOverview />
    </HalfLink>
  </HomeContainer>
);
const App = () => (
  <AppContainer>
    <NavigationBar />
    <AppSlate color={orange}>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/money">
          <Money />
        </Route>
        <Route path="/music">
          <Music />
        </Route>
      </Switch>
    </AppSlate>
  </AppContainer>
);

export default App;
