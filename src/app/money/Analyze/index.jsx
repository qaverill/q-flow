import * as React from 'react';
import styled from 'styled-components';
import ReviewChart from './charts/ReviewChart';
import FilteredData from './charts/FilteredData';
// ----------------------------------
// HELPERS
// ----------------------------------
const INCOME_FILTER = 'income';
const EXPENSES_FILTER = 'expenses';
// ----------------------------------
// STYLES
// ----------------------------------
const incomeChartHeight = '30%';
const reviewChartHeight = '20%';
const breakdownChartHeight = '50%';
const AnalyzeWrapper = styled.div`
  width: 100%;
  height: 100%;
`;
// ----------------------------------
// COMPONENTS
const Analyze = () => {
  const [filterToExpand, setFilterToExpand] = React.useState(null);
  const incomeIsExpanded = filterToExpand === INCOME_FILTER;
  const expensesIsExpanded = filterToExpand === EXPENSES_FILTER;
  const showReviewChart = filterToExpand == null;
  const showIncomeFilteredChart = showReviewChart || incomeIsExpanded;
  const showExpensesFilteredChart = showReviewChart || expensesIsExpanded;
  return (
    <AnalyzeWrapper>
      {showIncomeFilteredChart && (
        <FilteredData
          filter={INCOME_FILTER}
          height={incomeChartHeight}
          expanded={incomeIsExpanded}
          setFilterToExpand={setFilterToExpand}
        />
      )}
      {showReviewChart && <ReviewChart height={reviewChartHeight} />}
      {showExpensesFilteredChart && (
        <FilteredData
          filter={EXPENSES_FILTER}
          height={breakdownChartHeight}
          expanded={expensesIsExpanded}
          setFilterToExpand={setFilterToExpand}
        />
      )}
    </AnalyzeWrapper>
  );
};

export default Analyze;
