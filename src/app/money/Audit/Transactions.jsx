import * as React from 'react';
import styled from 'styled-components';
import { timestampToString, numberToPrice, copyStringToClipboard } from '@q/utils';
import { Text } from '@q/core';
import { PaybackTransacton, UntaggedTransaction, TaggedTransaction, PaybackFromTransaction } from './transactionStyles';
// ----------------------------------
// HELPERS
// ----------------------------------
const secretOnClick = (id) => () => copyStringToClipboard(id);
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
const TransactionContent = (props) => {
  const { transaction, isPayback } = props;
  const {
    timestamp, amount, description, tags,
  } = transaction;
  const date = timestampToString(timestamp);
  const dollarAmount = numberToPrice(amount);
  const tagsString = isPayback ? '💸' : tags.join(' - ');
  return (
    <>
      <Date>{date}</Date>
      <AmountWrapper>
        <Text>{dollarAmount}</Text>
      </AmountWrapper>
      <Description>{description}</Description>
      <Tags>{tagsString}</Tags>
    </>
  );
};

export const PaybackFrom = (props) => {
  const { transaction, setPaybackFrom } = props;
  function handleOnClick() {
    setPaybackFrom(null);
  }
  return (
    <PaybackFromTransaction onClick={handleOnClick}>
      <TransactionContent transaction={transaction} isPayback />
    </PaybackFromTransaction>
  );
};

export const Payback = (props) => {
  const { transaction, paybackFrom, setPaybackFrom } = props;
  const isSelectable = !paybackFrom;
  function handleOnClick() {
    if (!paybackFrom) setPaybackFrom(transaction);
  }
  return (
    <PaybackTransacton isSelectable={isSelectable} onClick={handleOnClick}>
      <TransactionContent transaction={transaction} isPayback />
    </PaybackTransacton>
  );
};

export const Untagged = (props) => {
  const { transaction } = props;
  const { id } = transaction;
  return (
    <UntaggedTransaction onClick={secretOnClick(id)}>
      <TransactionContent transaction={transaction} />
    </UntaggedTransaction>
  );
};

export const Tagged = (props) => {
  const {
    transaction, paybackFrom, setPaybackTo, index,
  } = props;
  const { id } = transaction;
  const isSelectable = !!paybackFrom;
  function handleOnClick() {
    if (paybackFrom) {
      setPaybackTo(transaction);
    } else {
      secretOnClick(id)();
    }
  }
  return (
    <TaggedTransaction isSelectable={isSelectable} onClick={handleOnClick} index={index}>
      <TransactionContent transaction={transaction} />
    </TaggedTransaction>
  );
};
