import React from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import NavigationBar from '../packages/navigation';
import { Slate } from '../packages/core';
import { red } from '../packages/colors';
import Money from './money';
import Music from './music';
// ----------------------------------
// STYLES
// ----------------------------------
const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  height: 100%;
`;
// ----------------------------------
// COMPONENTS
// ----------------------------------
export default function App() {
  const { pathname } = useLocation();
  const shouldDisplayMusic = pathname === '/' || pathname.includes('music');
  const shoulDisplayMoney = pathname === '/' || pathname.includes('money');
  return (
    <AppContainer>
      <NavigationBar />
      <Slate color={red}>
        <Switch>
          <Route path="/">
            {shouldDisplayMusic && <Music />}
            {shoulDisplayMoney && <Money />}
          </Route>
        </Switch>
      </Slate>
    </AppContainer>
  );
}
