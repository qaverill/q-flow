import styled from 'styled-components';
import * as R from 'ramda';
import {
  white, dark, yellow, medium,
} from '../colors';

export const Title = styled.p`
  font-size: 24px;
  color: ${(props) => (props.color == null ? white : props.color)};
  cursor: default;
  font-weight: bold;
  margin: 0;
`;

export const Text = styled.h1`
  font-size: 20px;
  color: ${(props) => (props.color == null ? white : props.color)};
  cursor: default;
  font-weight: bold;
  margin: 0;
`;

export const Button = styled.button`
  color: ${(props) => (props.color === yellow ? dark : white)};  
  height: 30px;
  padding: 2.5px 7.5px;
  text-align: center;
  text-decoration: none;
  font-size: 16px;
  border: 2px solid black;
  border-radius: 15px;
  :focus {
    outline: none;
  }
  background-color: ${(props) => (props.color == null ? medium : props.color)};
  ${(props) => props.onClick && (
    'cursor: pointer; :hover { filter: brightness(1.25); };'
  )}
`;

export const ScrollCSS = `
  ::-webkit-scrollbar {
    border-radius: 15px;
    background-color: ${dark};
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 15px;
    background-color: black;
    :hover {
      background-color: white;
    }
  }
`;
