import styled, { css } from 'styled-components';
import { green } from '@q/colors';
// ----------------------------------
// STYLES
// ----------------------------------
export const Item = styled.div`
  display: flex;
  align-items: center;
  border: black solid 3px;
  border-radius: 50px;
  margin: 0.25em;
  padding: 5px;
  background-color: ${(props) => props.backgroundColor};
  ${({ isClickable }) => isClickable && css`
    cursor: pointer !important;
    :hover {
      border: ${green} solid 3px;
    }
  `};
`;

export const deleteme = 1;
