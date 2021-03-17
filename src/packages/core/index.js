import styled from 'styled-components';
import { dark, white } from '../colors';

const SLATE_MARGIN = 20;
const SLATE_BORDER = 5;

export const Title = styled.p`
  font-size: 24px;
  color: ${(props) => (props.color == null ? white : props.color)};
  cursor: default;
  font-weight: bold;
  margin: 0;
`;

export const Text = styled.p`
  font-size: 16px;
  color: ${(props) => (props.color == null ? white : props.color)};
  cursor: default;
  font-weight: bold;
`;

export const Slate = styled.div`
  display: flex;
  flex-grow: 1;

  background-color: ${dark};
  border: ${SLATE_BORDER}px solid ${(props) => props.rimColor};
  border-radius: 15px;
  ${(props) => props.onClick && 'cursor: pointer;'}
  transition: all 250ms ease-in;
  :hover {
    flex-grow: 10;
  }
  overflow: auto;
`;
