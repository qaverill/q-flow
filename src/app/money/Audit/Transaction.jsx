import * as React from 'react';
import styled from 'styled-components';
import { timestampToString, numberToPrice, copyStringToClipboard } from '@q/utils';
import { Text } from '@q/core';
import {
  purple, light,
} from '@q/colors';
import { Item } from './styles';
import { isUntagged, isPayback } from './helpers';
// ----------------------------------
// HELPERS
// ----------------------------------
const determineBackgroundColor = ({ tags }, index) => {
  if (isUntagged(tags)) return light;
  if (isPayback(tags)) return purple;
  return `rgba(0, 255, 0, ${index % 2 === 0 ? 0.2 : 0.4})`;
};
// ----------------------------------
// STYLES
// ----------------------------------
const Date = styled(Text)`
  margin-left: 10px;
`;
const AmountWrapper = styled.div`
  width: 120px;
  display: flex;
  flex-direction: row-reverse;
  flex-shrink: 0;
`;
const Description = styled(Text)`
  margin-left: 20px;
`;
const Tags = styled(Text)`
  margin-left: auto;
`;
// ----------------------------------
// COMPONENTS
// ----------------------------------
const Transaction = (props) => {
  const { transaction, index } = props;
  const {
    id, timestamp, amount, description, tags,
  } = transaction;
  const backgroundColor = determineBackgroundColor(transaction, index);
  const isClickable = isPayback(tags);
  const date = timestampToString(timestamp);
  const dollarAmount = numberToPrice(amount);
  const tagsString = isPayback(tags) ? '💸' : tags.join(' - ');
  function handleSelect() {
    copyStringToClipboard(id);
  }
  return (
    <Item
      backgroundColor={backgroundColor}
      isClickable={isClickable}
      onClick={handleSelect}
    >
      <Date>{date}</Date>
      <AmountWrapper>
        <Text>{dollarAmount}</Text>
      </AmountWrapper>
      <Description>{description}</Description>
      <Tags>{tagsString}</Tags>
    </Item>
  );
};

export default Transaction;
