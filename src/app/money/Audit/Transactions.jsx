import * as React from 'react';
import styled, { css } from 'styled-components';
import { numberToPrice, copyStringToClipboard } from '@q/utils';
import { timestampToString } from '@q/time';
import { Text } from '@q/core';
import { blue, light } from '@q/colors';
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
const REMOVE_SYMBOL = '❌';
const secretAction = (id) => copyStringToClipboard(id);
const paybackIsValid = (paybackFrom, paybackTo) => paybackFrom.amount <= paybackTo.amount * -1;
// ----------------------------------
// STYLES
// ----------------------------------
const Date = styled(Text)`
  margin-left: 10px;
`;
const ActionWrapper = styled.div`
  width: 20px;
`;
const Action = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 10px;
  width: 12px;
  padding-top: 2px;
  border-radius: 50px;
  margin-left: 3px;
  cursor: pointer;
  :hover {
    border: ${blue} solid 3px;
    margin-left: 0;
  }
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
  const { transaction, actionSymbol, actionHandler } = props;
  const {
    id, timestamp, amount, description, tags,
  } = transaction;
  const date = timestampToString(timestamp);
  const isSelectable = !!actionSymbol;
  const dollarAmount = numberToPrice(amount);
  const tagsString = tags.join(' - ');
  function handleAction() {
    if (isSelectable) {
      actionHandler();
    } else {
      secretAction(id);
    }
  }
  return (
    <>
      <Date>{date}</Date>
      <ActionWrapper>
        <Action isSelectable={isSelectable} onClick={handleAction}>{actionSymbol}</Action>
      </ActionWrapper>
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
  const actionSymbol = REMOVE_SYMBOL;
  function actionHandler() {
    setPaybackFrom(null);
    setPaybackTo(null);
  }
  return (
    <PaybackFromTransaction>
      <TransactionContent
        transaction={paybackFrom}
        actionSymbol={actionSymbol}
        actionHandler={actionHandler}
      />
    </PaybackFromTransaction>
  );
};

export const PaybackTo = () => {
  const { paybackTo, setPaybackTo } = useAuditContext();
  const actionSymbol = REMOVE_SYMBOL;
  function actionHandler() {
    setPaybackTo(null);
  }
  return (
    <PaybackToTransaction>
      <TransactionContent
        transaction={paybackTo}
        actionSymbol={actionSymbol}
        actionHandler={actionHandler}
      />
    </PaybackToTransaction>
  );
};

export const Payback = (props) => {
  const { transaction } = props;
  const { paybackFrom, setPaybackFrom } = useAuditContext();
  const actionSymbol = PAYBACK_SYMBOL;
  function actionHandler() {
    if (!paybackFrom) setPaybackFrom(transaction);
  }
  return (
    <PaybackTransacton>
      <TransactionContent
        transaction={transaction}
        actionSymbol={actionSymbol}
        actionHandler={actionHandler}
      />
    </PaybackTransacton>
  );
};

export const Untagged = (props) => {
  const { transaction } = props;
  const { paybackFrom, setPaybackTo } = useAuditContext();
  const isValidPayback = paybackFrom && paybackIsValid(paybackFrom, transaction);
  const isPaybackFromCandidate = paybackFrom && isValidPayback;
  const actionSymbol = isPaybackFromCandidate ? PAYBACK_SYMBOL : null;
  function handleAction() {
    setPaybackTo(transaction);
  }
  const actionHandler = isPaybackFromCandidate ? handleAction : null;
  return (
    <UntaggedTransaction>
      <TransactionContent
        transaction={transaction}
        actionSymbol={actionSymbol}
        actionHandler={actionHandler}
      />
    </UntaggedTransaction>
  );
};

export const Tagged = (props) => {
  const { transaction, index } = props;
  const { paybackFrom, setPaybackTo } = useAuditContext();
  const isValidPayback = paybackFrom && paybackIsValid(paybackFrom, transaction);
  const isPaybackFromCandidate = paybackFrom && isValidPayback;
  const actionSymbol = isPaybackFromCandidate ? PAYBACK_SYMBOL : null;
  function handleAction() {
    setPaybackTo(transaction);
  }
  const actionHandler = isPaybackFromCandidate ? handleAction : null;
  return (
    <TaggedTransaction index={index}>
      <TransactionContent
        transaction={transaction}
        actionSymbol={actionSymbol}
        actionHandler={actionHandler}
      />
    </TaggedTransaction>
  );
};
