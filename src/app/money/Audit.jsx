import * as React from 'react';
import styled from 'styled-components';
import { timestampToString, numberToPrice } from '../../packages/utils';
import { fetchTransactions } from './api';
import { Text, Button } from '../../packages/core';
import { purple } from '../../packages/colors';
// ----------------------------------
// HELPERS
// ----------------------------------
const isPayback = (tags) => tags.includes('payBack');
const determineBackgroundColor = ({ tags }, index) => {
  if (isPayback(tags) || tags[0] === '') return 'rgba(255, 255, 0, 0.5)';
  return `rgba(0, 255, 0, ${index % 2 === 0 ? 0.2 : 0.4})`;
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
  margin: 0.25em;
  padding: 5px;
  background-color: ${(props) => props.backgroundColor};
`;
const Date = styled(Text)`
  margin-left: 10px;
`;
const AmountWrapper = styled.div`
  width: 120px;
  display: flex;
  flex-direction: row-reverse;
  flex-shrink: 0;
`;
const Description = styled(Text)`
  margin-left: 20px;
`;
const TagsText = styled(Text)`
  margin-left: auto;
`;
const TagButton = styled(Button)`
  margin: -3px 0 -3px auto;
`;
// ----------------------------------
// COMPONENTS
// ----------------------------------
const Amount = (props) => {
  const { children } = props;
  return (
    <AmountWrapper>
      <Text>{children}</Text>
    </AmountWrapper>
  );
};
const Tags = (props) => {
  const { children: tags } = props;
  const tagsString = tags.join(' - ');
  function onClick() {
    console.log(tags);
  }
  if (isPayback(tags)) {
    return <TagButton onClick={onClick} color={purple}>💸</TagButton>;
  } return <TagsText>{tagsString}</TagsText>;
};
const Transaction = ({ transaction, index }) => {
  const {
    timestamp, amount, description, tags,
  } = transaction;
  const backgroundColor = determineBackgroundColor(transaction, index);
  const date = timestampToString(timestamp);
  const dollarAmount = numberToPrice(amount);
  return (
    <TransactionContainer backgroundColor={backgroundColor}>
      <Date>{date}</Date>
      <Amount>{dollarAmount}</Amount>
      <Description>{description}</Description>
      <Tags>{tags}</Tags>
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
      {transactions.reverse().map((transaction, index) => (
        <Transaction key={transaction.id} transaction={transaction} index={index} />
      ))}
    </AuditContainer>
  );
};

export default Audit;
