import * as React from 'react';
import * as R from 'ramda';
import styled from 'styled-components';
import { Text, Loading } from '@q/core';
import { green, red } from '@q/colors';
import { fetchTransactions } from '../api';
import { Item } from './styles';
import Transaction from './Transaction';
import { isUntagged, isPayback } from './helpers';
// ----------------------------------
// STYLES
// ----------------------------------
const AuditContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
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
  const untagged = transactions.filter(({ tags }) => isUntagged(tags));
  const paybacks = transactions.filter(({ tags }) => isPayback(tags));
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
  const filteredTransactions = filterOutGreens
    ? transactions.filter(({ tags }) => isPayback(tags) || isUntagged(tags))
    : transactions;
  React.useEffect(() => {
    fetchTransactions().then(setTransactions);
  }, []);
  function handleSummaryClick() {
    setFilterOutGreens(!filterOutGreens);
  }
  if (R.isEmpty(transactions)) return <Loading />;
  return (
    <AuditContainer>
      <Summary transactions={transactions} onClick={handleSummaryClick} />
      {filteredTransactions.reverse().map((transaction, index) => (
        <Transaction key={transaction.id} transaction={transaction} index={index} />
      ))}
    </AuditContainer>
  );
};

export default Audit;
