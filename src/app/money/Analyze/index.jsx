import * as React from 'react';
import * as R from 'ramda';
import { Title } from '@q/core';
import { fetchAnalysis } from '../api';
// ----------------------------------
// HELPERS
// ----------------------------------
// ----------------------------------
// STYLES
// ----------------------------------
// ----------------------------------
// COMPONENTS
// ----------------------------------
const Analyze = (props) => {
  const [analysis, setAnalysis] = React.useState({});
  function loadAnalysis() {
    fetchAnalysis().then(setAnalysis);
  }
  React.useEffect(loadAnalysis, []);
  console.log(analysis);
  return (
    <Title>{R.keys(analysis.monthlyDeltas).length}</Title>
  );
};

export default Analyze;
