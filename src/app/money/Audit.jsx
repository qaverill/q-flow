import * as React from 'react';
import * as R from 'ramda';
import styled, { css } from 'styled-components';
import { timestampToString, numberToPrice } from '../../packages/utils';
import { fetchTransactions } from './api';
import { Text, Loading } from '../../packages/core';
import { purple, light, green, red } from '../../packages/colors';
// ----------------------------------
// HELPERS
// ----------------------------------
const isPayback = (tags) => tags.includes('payBack');
const isUntagged = (tags) => tags[0] === '';
const determineBackgroundColor = ({ tags }, index) => {
  if (isUntagged(tags)) return light;
  if (isPayback(tags)) return purple;
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
const Item = styled.div`
  display: flex;
  align-items: center;
  border: black solid 3px;
  border-radius: 50px;
  margin: 0.25em;
  padding: 5px;
  background-color: ${(props) => props.backgroundColor};
  ${({ isClickable }) => isClickable && css`
    cursor: pointer !important;
    :hover {
      border: ${green} solid 3px;
    }
  `};
`;
const SummaryContainer = styled(Item)`
  padding-left: 1em;
  padding-right: 1em;
  width: 300px;
  align-self: center;
  justify-content: space-between;
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
const Tags = styled(Text)`
  margin-left: auto;
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
const Transaction = ({ transaction, index }) => {
  const {
    id, timestamp, amount, description, tags,
  } = transaction;
  const backgroundColor = determineBackgroundColor(transaction, index);
  const isClickable = isPayback(tags);
  const date = timestampToString(timestamp);
  const dollarAmount = numberToPrice(amount);
  const tagsString = isPayback(tags) ? '💸' : tags.join(' - ');
  function handleSelect() {
    console.log(id);
  }
  return (
    <Item
      backgroundColor={backgroundColor}
      isClickable={isClickable}
      onClick={handleSelect}
    >
      <Date>{date}</Date>
      <Amount>{dollarAmount}</Amount>
      <Description>{description}</Description>
      <Tags>{tagsString}</Tags>
    </Item>
  );
};
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
    ? transactions.filter(({ tags }) => isPayback(tags) || isUntagged(tags)).reverse()
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
