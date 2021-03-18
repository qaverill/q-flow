import * as React from 'react';
import styled from 'styled-components';
import { fetchTransactions } from './api';
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
  border: black solid 3px;
  border-radius: 50px;
  margin: 0.25em;
  padding: 0.25em;
  background-color: ${(props) => props.backgroundColor};
`;
const Tags = styled.div`
  align-self: flex-end;
`;
// ----------------------------------
// COMPONENTS
// ----------------------------------
const Transaction = ({ transaction }) => {
  const { description, id, tags } = transaction;
  const backgroundColor = determineBackgroundColor(tags);
  console.log(tags)
  return (
    <TransactionContainer key={id} backgroundColor={backgroundColor}>
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
