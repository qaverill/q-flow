import * as React from 'react';
import styled from 'styled-components';
import { timestampToString, numberToPrice, copyStringToClipboard } from '@q/utils';
import { Text } from '@q/core';
import {
  purple, light,
} from '@q/colors';
import { Item } from './styles';
import { transactionIsUntagged, transactionIsPayback } from './helpers';
// ----------------------------------
// HELPERS
// ----------------------------------
const determineBackgroundColor = (transaction, index) => {
  if (transactionIsUntagged(transaction)) return light;
  if (transactionIsPayback(transaction)) return purple;
  return `rgba(0, 255, 0, ${index % 2 === 0 ? 0.2 : 0.4})`;
};
const transactionIsSelectable = (transaction, paybackFrom) => {
  const isPayback = transactionIsPayback(transaction);
  if (paybackFrom) {
    if (transaction === paybackFrom) return true;
    if (!isPayback) return true;
  } else if (isPayback) return true;
  return false;
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
  const {
    transaction, index, paybackFrom, setPaybackFrom,
  } = props;
  const {
    id, timestamp, amount, description, tags,
  } = transaction;
  const backgroundColor = determineBackgroundColor(transaction, index);
  const date = timestampToString(timestamp);
  const dollarAmount = numberToPrice(amount);
  const isPayback = transactionIsPayback(transaction);
  const tagsString = isPayback ? '💸' : tags.join(' - ');
  const isSelectable = transactionIsSelectable(transaction, paybackFrom);
  function handleClick() {
    if (isPayback) {
      if (!paybackFrom) setPaybackFrom(transaction);
      if (paybackFrom === transaction) setPaybackFrom(null);
    } else {
      copyStringToClipboard(id);
    }
  }
  return (
    <Item
      backgroundColor={backgroundColor}
      isSelectable={isSelectable}
      onClick={handleClick}
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
