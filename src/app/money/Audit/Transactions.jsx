import * as React from 'react';
import styled from 'styled-components';
import { timestampToString, numberToPrice, copyStringToClipboard } from '@q/utils';
import { Text } from '@q/core';
import {
  PaybackTransacton,
  UntaggedTransaction,
  TaggedTransaction,
  PaybackFromTransaction,
  PaybackToTransaction,
} from './transactionStyles';
import { useAuditContext } from './context';
// ----------------------------------
// HELPERS
// ----------------------------------
export const PAYBACK_SYMBOL = '💸';
const secretOnClick = (id) => () => copyStringToClipboard(id);
const paybackIsValid = (paybackFrom, paybackTo) => paybackFrom.amount < paybackTo.amount * -1;
// ----------------------------------
// STYLES
// ----------------------------------
const Date = styled(Text)`
  margin-left: 10px;
`;
const PaybackSymbol = styled.div`
  display: flex;
  align-items: center;
  margin-left: 10px;
`;
const AmountWrapper = styled.div`
  width: 110px;
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
  const { transaction, showPaybackSymbol } = props;
  const {
    timestamp, amount, description, tags,
  } = transaction;
  const date = timestampToString(timestamp);
  const paybackSymbol = showPaybackSymbol && PAYBACK_SYMBOL;
  const dollarAmount = numberToPrice(amount);
  const tagsString = tags.join(' - ');
  return (
    <>
      <Date>{date}</Date>
      <PaybackSymbol>{paybackSymbol}</PaybackSymbol>
      <AmountWrapper>
        <Text>{dollarAmount}</Text>
      </AmountWrapper>
      <Description>{description}</Description>
      <Tags>{tagsString}</Tags>
    </>
  );
};

export const PaybackFrom = () => {
  const { paybackFrom, setPaybackFrom, setPaybackTo } = useAuditContext();
  function handleOnClick() {
    setPaybackFrom(null);
    setPaybackTo(null);
  }
  return (
    <PaybackFromTransaction onClick={handleOnClick}>
      <TransactionContent transaction={paybackFrom} />
    </PaybackFromTransaction>
  );
};

export const PaybackTo = () => {
  const { paybackTo, setPaybackTo } = useAuditContext();
  function handleOnClick() {
    setPaybackTo(null);
  }
  return (
    <PaybackToTransaction onClick={handleOnClick}>
      <TransactionContent transaction={paybackTo} />
    </PaybackToTransaction>
  );
};

export const Payback = (props) => {
  const { transaction } = props;
  const { paybackFrom, setPaybackFrom } = useAuditContext();
  const isSelectable = !paybackFrom;
  function handleOnClick() {
    if (!paybackFrom) setPaybackFrom(transaction);
  }
  return (
    <PaybackTransacton isSelectable={isSelectable} onClick={handleOnClick}>
      <TransactionContent transaction={transaction} />
    </PaybackTransacton>
  );
};

export const Untagged = (props) => {
  const { transaction } = props;
  return (
    <UntaggedTransaction onClick={secretOnClick(transaction.id)}>
      <TransactionContent transaction={transaction} />
    </UntaggedTransaction>
  );
};

export const Tagged = (props) => {
  const { transaction, index } = props;
  const { paybackFrom, setPaybackTo } = useAuditContext();
  const isValidPayback = paybackFrom && paybackIsValid(paybackFrom, transaction);
  const isSelectable = !!paybackFrom && isValidPayback;
  function handleOnClick() {
    if (paybackFrom && isValidPayback) {
      setPaybackTo(transaction);
    } else {
      secretOnClick(transaction.id)();
    }
  }
  return (
    <TaggedTransaction isSelectable={isSelectable} onClick={handleOnClick} index={index}>
      <TransactionContent transaction={transaction} showPaybackSymbol={isValidPayback} />
    </TaggedTransaction>
  );
};
