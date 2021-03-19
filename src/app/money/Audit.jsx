import * as React from 'react';
import styled from 'styled-components';
import { timestampToString } from '../../packages/utils';
import { fetchTransactions } from './api';
import { Text } from '../../packages/core';
// ----------------------------------
// HELPERS
// ----------------------------------
const determineBackgroundColor = (tags) => {
  if (tags[0] === '') return 'red';
  if (tags.includes('payBack')) return 'yellow';
  return 'green';
};
// ----------------------------------
// STYLES
// ----------------------------------
const AuditContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow: auto;
`;
const TransactionContainer = styled.div`
  display: flex;
  align-items: center;
  border: black solid 3px;
  border-radius: 50px;
  padding-top: 2px;
  margin: 0.25em;
  background-color: ${(props) => props.backgroundColor};
`;
const Date = styled(Text)`
  margin-left: 1em;
`;
const Tags = styled.div`
  align-self: flex-end;
`;
// ----------------------------------
// COMPONENTS
// ----------------------------------
const Transaction = ({ transaction }) => {
  const { timestamp, description, id, tags } = transaction;
  const backgroundColor = determineBackgroundColor(tags);
  const date = timestampToString(timestamp);
  console.log(transaction)
  return (
    <TransactionContainer key={id} backgroundColor={backgroundColor}>
      <Date>{date}</Date>
      {description}
      <Tags>{tags.join(',')}</Tags>
    </TransactionContainer>
  );
};
const Audit = () => {
  const [transactions, setTransactions] = React.useState([]);
  React.useEffect(() => {
    fetchTransactions().then(setTransactions);
  }, []);
  return (
    <AuditContainer>
      {transactions.reverse().map((transaction) => (
        <Transaction key={transaction.id} transaction={transaction} />
      ))}
    </AuditContainer>
  );
};

export default Audit;
