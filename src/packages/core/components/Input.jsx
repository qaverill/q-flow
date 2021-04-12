import styled from 'styled-components';
import * as React from 'react';
import { blue } from '@q/colors';
import { timestampToString, stringToTimestamp } from '@q/utils';
// ----------------------------------
// HELPERS
// ----------------------------------
export const dateIsValid = (input) => {
  const split = input.split('/');
  if (split.length === 3) {
    if (split.every((val) => !!parseInt(val, 10))) {
      return true;
    }
  }
  return false;
};
// ----------------------------------
// STYLES
// ----------------------------------
const StyledInput = styled.input`
  font-size: 16px;
  height: 30px;
  width: 200px;
  padding: 0 7.5px;
  border: 2px solid black;
  border-radius: 15px;
  margin: 2.5px;
  box-sizing: border-box;
  background-color: white;
  color: black;
  text-align: center;
  :hover {
    border: 2px solid ${blue};
  }
  :focus {
    outline: none;
    border: 3px solid ${blue};
    padding: 1.5px;
    padding-left: 6.5px;
  }
`;
const StyledDateInput = styled(StyledInput)`
  width: 82px;
`;
// ----------------------------------
// COMPONENTS
// ----------------------------------
const Input = (props) => {
  const { onBlur, defaultValue } = props;
  function handleKeyPress(event) {
    const { key, target } = event;
    if (key === 'Enter') target.blur();
  }
  return (
    <StyledInput onBlur={onBlur} onKeyPress={handleKeyPress} defaultValue={defaultValue} />
  );
};
export const TextInput = (props) => {
  const { onChange } = props;
  function handleChange(value) {
    onChange(value.target.value);
  }
  return (
    <Input onBlur={handleChange} />
  );
};
export const DateInput = (props) => {
  const { onChange, value } = props;
  const dateString = timestampToString(value);
  function handleChange(event) {
    const input = event.target.value;
    if (dateIsValid(input)) {
      const newValue = stringToTimestamp(input);
      onChange(newValue);
    }
  }
  return (
    <StyledDateInput onBlur={handleChange} defaultValue={dateString} />
  );
};
