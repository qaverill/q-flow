import styled, { css } from 'styled-components';
import {
  success, black, blue, error, light, warning,
} from '@q/colors';
// ----------------------------------
// STYLES
// ----------------------------------
export const Item = styled.div`
  display: flex;
  align-items: center;
  border: ${black} solid 3px;
  border-radius: 50px;
  margin: 0.25em;
  padding: 5px;
`;

export const PaybackFromTransaction = styled(Item)`
  background-color: ${blue};
  cursor: pointer;
  :hover {
    border: ${error} solid 3px;
  }
`;

export const PaybackToTransaction = styled(Item)`
  background-color: ${success};
  cursor: pointer;
  :hover {
    border: ${error} solid 3px;
  }
`;

export const PaybackTransacton = styled(Item)`
  background-color: ${blue};
  ${({ isSelectable }) => isSelectable && css`
    cursor: pointer;
    :hover {
      border: ${success} solid 3px;
    }
  `};
`;

export const UntaggedTransaction = styled(Item)`
  background-color: ${light};
  border: ${warning} solid 3px !important;
`;

export const TaggedTransaction = styled(Item)`
  background-color: rgba(28, 178, 80, ${(props) => (((props.index % 2) + 1) * 0.5)});
  ${({ isSelectable }) => isSelectable && css`
    cursor: pointer;
    :hover {
      border: ${blue} solid 3px;
    }
  `};
`;
