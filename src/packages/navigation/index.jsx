import * as React from 'react';
import * as R from 'ramda';
import styled from 'styled-components';
import { useLocation, useHistory, NavLink } from 'react-router-dom';
import { ScrollCSS, Title } from '../core/styles';
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
const StyledNavLink = styled(NavLink)`
  cursor: pointer;
`;
// ----------------------------------
// COMPONENTS
// ----------------------------------
const LinkToPath = ({ path }) => {
  return (
    <StyledNavLink to={`/${path}`}>
      <Title>{path}</Title>
    </StyledNavLink>
  );
}
const NavigationBar = () => {
  const location = useLocation();
  const paths = selectPath(location);
  return (
    <NavigationBarContainer>
      <StyledNavLink to="/"><Title>Q</Title></StyledNavLink>
      
      {paths.map((path, index) => (
        <React.Fragment key={path}>
          <Title>-></Title>
          {index !== paths.length - 1 
            ? <LinkToPath path={path} />
            : <Title>{path}</Title>
          }
        </React.Fragment>
      ))}
    </NavigationBarContainer>
  );
};

export default NavigationBar;
