import * as React from 'react';
import styled from 'styled-components';
import { fetchTransactions } from './api';
// ----------------------------------
// HELPERS
// ----------------------------------
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
`;
// ----------------------------------
// COMPONENTS
// ----------------------------------
const Transaction = ({ transaction }) => {
  const { description, id } = transaction;
  return (
    <TransactionContainer key={id}>
      {description}
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
