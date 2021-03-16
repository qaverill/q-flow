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
  height: 50px;
  border: black solid 2px;
  border-radius: 50px;
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
      {transactions.reverse().map((transaction) => <Transaction key={transaction.id} transaction={transaction} />)}
    </AuditContainer>
  );
};

export default Audit;
