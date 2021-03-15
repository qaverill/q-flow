import React from 'react';
import * as R from 'ramda';
import styled from 'styled-components';
import { useLocation, useHistory } from 'react-router-dom';
import { Title } from '../core';
import { dark } from '../colors';
// ----------------------------------
// HELPERS
// ----------------------------------
// TODO: make this return objects that include the full path up to each item in path
const mapToDataNeeded = (path) => path;
const selectPath = R.compose(
  mapToDataNeeded,
  R.filter(R.compose(
    R.not,
    R.isEmpty,
  )),
  R.split('/'),
  R.prop('pathname'),
);
// ----------------------------------
// STYLES
// ----------------------------------
const NavigationBarContainer = styled.div`
  display: flex;
  margin: 20px 20px 0 20px;
`;
const NavigationItemContainer = styled.div`
  background-color: ${dark};
  border: 5px solid ${(props) => props.color};
  border-radius: 15px 15px 15px 15px;
`;
// ----------------------------------
// COMPONENTS
// ----------------------------------
const NavigationItem = (props) => {
  const { path } = props;
  return (
    <NavigationItemContainer>
      <Title>{path}</Title>
    </NavigationItemContainer>
  );
};
const NavigationBar = () => {
  const paths = selectPath(useLocation());
  const history = useHistory();
  const navigateToQ = () => history.replace('/');
  return (
    <NavigationBarContainer>
      <Title onClick={navigateToQ}>Q</Title>
      {paths.map((path) => <NavigationItem path={path} />)}
    </NavigationBarContainer>
  );
};

export default NavigationBar;
