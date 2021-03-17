import * as React from 'react';
import * as R from 'ramda';
import styled from 'styled-components';
import { useLocation, useHistory } from 'react-router-dom';
import { Title } from '../core/styles';
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
  align-items: center;
  margin: 1em 1em 0 1em;
`;
// ----------------------------------
// COMPONENTS
// ----------------------------------
const NavigationBar = () => {
  const paths = selectPath(useLocation());
  const history = useHistory();
  const navigateToQ = () => history.replace('/');
  return (
    <NavigationBarContainer>
      <Title onClick={navigateToQ}>Q</Title>
      {paths.map((path) => (
        <React.Fragment key={path}>
          <Title>-></Title>
          <Title>{path}</Title>
        </React.Fragment>
      ))}
    </NavigationBarContainer>
  );
};

export default NavigationBar;
