import * as React from 'react';
import * as R from 'ramda';
import styled from 'styled-components';
import { Text, Loading } from '@q/core';
import { success, error, blue } from '@q/colors';
import { fetchTransactions } from '../api';
import { Item } from './transactionStyles';
import {
  PaybackFrom, Payback, Untagged, Tagged, PaybackTo, PAYBACK_SYMBOL,
} from './Transactions';
import { AuditProvider, useAuditContext } from './context';
// ----------------------------------
// HELPERS
// ----------------------------------
const transactionIsPayback = ({ tags }) => tags.includes('payBack');
const transactionIsUntagged = ({ tags }) => tags[0] === '';
const filterTransactions = () => {
  const { transactions, filterOutGreens, paybackFrom } = useAuditContext();
  const filteredTransactions = filterOutGreens
    ? transactions.filter((transaction) => (
      transactionIsPayback(transaction) || transactionIsUntagged(transaction)
    ))
    : transactions;
  return R.without([paybackFrom], filteredTransactions);
};
// ----------------------------------
// STYLES
// ----------------------------------
const AuditContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow: auto;
  height: 100%;
`;
const ScrollableBody = styled.div`
  display: flex;
  flex-direction: column;
  overflow: auto;
`;
const SummaryContainer = styled(Item)`
  padding-left: 1em;
  padding-right: 1em;
  width: 300px;
  align-self: center;
  justify-content: space-between;
  background-color: ${error};
`;
const SubmitPayback = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 110px;
  width: 140px;
  height: 130px;
  padding-top: 8px;
  margin: 0 auto;
  cursor: pointer;
  border: ${blue} solid 3px;
  border-radius: 50px;
  :hover {
    border: ${success} solid 3px;
  }
`;
// ----------------------------------
// COMPONENTS
// ----------------------------------
const Summary = () => {
  const { transactions, filterOutGreens, setFilterOutGreens } = useAuditContext();
  const untagged = transactions.filter(transactionIsUntagged);
  const paybacks = transactions.filter(transactionIsPayback);
  const color = untagged.length === 0 && paybacks.length === 0 ? success : error;
  function handleOnClick() {
    setFilterOutGreens(!filterOutGreens);
  }
  return (
    <SummaryContainer backgroundColor={color} onClick={handleOnClick} isClickable>
      <Text>{`Untagged: ${untagged.length}`}</Text>
      <Text>{`Paybacks: ${paybacks.length}`}</Text>
    </SummaryContainer>
  );
};
const Transactions = () => {
  const transactions = filterTransactions();
  return transactions.reverse().map((transaction, index) => {
    const isPayback = transactionIsPayback(transaction);
    const isUntagged = transactionIsUntagged(transaction);
    return (
      <React.Fragment key={transaction.id}>
        {isPayback && !isUntagged && <Payback transaction={transaction} />}
        {isUntagged && !isPayback && <Untagged transaction={transaction} />}
        {!isPayback && !isUntagged && <Tagged transaction={transaction} index={index} />}
      </React.Fragment>
    );
  });
};
const Audit = () => {
  const {
    transactions, setTransactions, paybackFrom, paybackTo,
  } = useAuditContext();
  React.useEffect(() => {
    fetchTransactions().then(setTransactions);
  }, []);
  function handleSubmitPayback() {
    console.log(paybackFrom, 'TO', paybackTo);
  }
  if (R.isEmpty(transactions)) return <Loading />;
  return (
    <AuditContainer>
      {paybackFrom && <PaybackFrom />}
      {paybackTo && <PaybackTo />}
      {!paybackTo && (
        <ScrollableBody>
          <Summary />
          <Transactions />
        </ScrollableBody>
      )}
      {paybackFrom && paybackTo && (
        <SubmitPayback onClick={handleSubmitPayback}>{PAYBACK_SYMBOL}</SubmitPayback>
      )}
    </AuditContainer>
  );
};

export default Audit;
export { AuditProvider };
