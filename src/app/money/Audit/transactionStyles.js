import styled from 'styled-components';
import {
  success, black, blue, light, warning,
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
`;

export const PaybackToTransaction = styled(Item)`
  background-color: ${success};
`;

export const PaybackTransacton = styled(Item)`
  background-color: ${light};
  border: ${blue} solid 3px !important;
`;

export const UntaggedTransaction = styled(Item)`
  background-color: ${light};
  border: ${warning} solid 3px !important;
`;

export const TaggedTransaction = styled(Item)`
  background-color: rgba(28, 178, 80, ${(props) => (((props.index % 2) + 1) * 0.5)});
`;
