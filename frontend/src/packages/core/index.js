import styled from 'styled-components';
import { dark, white } from '../colors';

const SLATE_MARGIN = 20;
const SLATE_BORDER = 5;

export const Title = styled.p`
  font-size: 24px;
  color: ${props => (props.color == null ? white : props.color)};
  cursor: default;
  font-weight: bold;
  margin: 0;
`;

export const Text = styled.p`
  font-size: 16px;
  color: ${props => (props.color == null ? white : props.color)};
  cursor: default;
  font-weight: bold;
`;

export const Slate = styled.div`
  background-color: ${dark};
  border: ${SLATE_BORDER}px solid ${props => props.rimColor};
  border-radius: 15px 15px 15px 15px;
  margin: ${SLATE_MARGIN}px;
  ${props => props.left && `margin-right: ${SLATE_MARGIN / 2}px;`}
  ${props => props.right && `margin-left: ${SLATE_MARGIN / 2}px;`}
  ${props => props.onClick && 'cursor: pointer;'}
  transition: all 250ms ease-in;
  :hover {
    flex-grow: 10;
  }
  display: flex;
  ${props => !props.root && 'justify-content: center;'}
  ${props => !props.root && 'align-items: center;'}
  flex-grow: 1;
`;
