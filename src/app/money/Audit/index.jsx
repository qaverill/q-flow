import * as React from 'react';
import * as R from 'ramda';
import styled from 'styled-components';
import { Text, Loading } from '@q/core';
import { success, error } from '@q/colors';
import { fetchTransactions } from '../api';
import { Item } from './transactionStyles';
import { PaybackFrom, Payback, Untagged, Tagged } from './Transactions';
// ----------------------------------
// HELPERS
// ----------------------------------
const transactionIsPayback = ({ tags }) => tags.includes('payBack');
const transactionIsUntagged = ({ tags }) => tags[0] === '';
const filterTransactions = (transactions, filterOutGreens, paybackFrom) => {
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
// ----------------------------------
// COMPONENTS
// ----------------------------------
const Summary = (props) => {
  const { transactions, filterOutGreens, setFilterOutGreens } = props;
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
const Transactions = (props) => {
  const {
    transactions, paybackFrom, setPaybackFrom, setPaybackTo,
  } = props;
  return transactions.reverse().map((transaction, index) => {
    const isPayback = transactionIsPayback(transaction);
    const isUntagged = transactionIsUntagged(transaction);
    if (isPayback) {
      return (
        <Payback
          transaction={transaction}
          paybackFrom={paybackFrom}
          setPaybackFrom={setPaybackFrom}
        />
      );
    }
    if (isUntagged) {
      return (
        <Untagged transaction={transaction} />
      );
    }
    return (
      <Tagged
        transaction={transaction}
        paybackFrom={paybackFrom}
        setPaybackTo={setPaybackTo}
        index={index}
      />
    );
  });
};
const Audit = () => {
  const [transactions, setTransactions] = React.useState([]);
  const [filterOutGreens, setFilterOutGreens] = React.useState(false);
  const [paybackFrom, setPaybackFrom] = React.useState(null);
  const [paybackTo, setPaybackTo] = React.useState(null);
  const filteredTransactions = filterTransactions(transactions, filterOutGreens, paybackFrom);
  React.useEffect(() => {
    fetchTransactions().then(setTransactions);
  }, []);
  if (R.isEmpty(transactions)) return <Loading />;
  return (
    <AuditContainer>
      {paybackFrom && <PaybackFrom transaction={paybackFrom} setPaybackFrom={setPaybackFrom} />}
      <ScrollableBody>
        <Summary
          transactions={transactions}
          filterOutGreens={filterOutGreens}
          setFilterOutGreens={setFilterOutGreens}
        />
        <Transactions
          transactions={filteredTransactions}
          paybackFrom={paybackFrom}
          setPaybackFrom={setPaybackFrom}
          setPaybackTo={setPaybackTo}
        />
      </ScrollableBody>
    </AuditContainer>
  );
};

export default Audit;
