import * as React from 'react';
import * as R from 'ramda';
import styled from 'styled-components';
import { Text, Loading } from '@q/core';
import { green, red } from '@q/colors';
import { fetchTransactions } from '../api';
import { Item } from './styles';
import Transaction from './Transaction';
import { transactionIsUntagged, transactionIsPayback } from './helpers';
// ----------------------------------
// HELPERS
// ----------------------------------
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
`;
// ----------------------------------
// COMPONENTS
// ----------------------------------
const Summary = (props) => {
  const { transactions, onClick } = props;
  const untagged = transactions.filter(transactionIsUntagged);
  const paybacks = transactions.filter(transactionIsPayback);
  const color = untagged.length === 0 && paybacks.length === 0 ? green : red;
  return (
    <SummaryContainer backgroundColor={color} onClick={onClick} isClickable>
      <Text>{`Untagged: ${untagged.length}`}</Text>
      <Text>{`Paybacks: ${paybacks.length}`}</Text>
    </SummaryContainer>
  );
};
const Audit = () => {
  const [transactions, setTransactions] = React.useState([]);
  const [filterOutGreens, setFilterOutGreens] = React.useState(false);
  const [paybackFrom, setPaybackFrom] = React.useState(null);
  const filteredTransactions = filterTransactions(transactions, filterOutGreens, paybackFrom);
  const paybackProps = { paybackFrom, setPaybackFrom };
  React.useEffect(() => {
    fetchTransactions().then(setTransactions);
  }, []);
  function handleSummaryClick() {
    setFilterOutGreens(!filterOutGreens);
  }
  if (R.isEmpty(transactions)) return <Loading />;
  return (
    <AuditContainer>
      {paybackFrom && <Transaction transaction={paybackFrom} {...paybackProps} />}
      <ScrollableBody>
        <Summary transactions={transactions} onClick={handleSummaryClick} />
        {filteredTransactions.reverse().map((transaction, index) => (
          <Transaction
            key={transaction.id}
            transaction={transaction}
            index={index}
            {...paybackProps}
          />
        ))}
      </ScrollableBody>
    </AuditContainer>
  );
};

export default Audit;
