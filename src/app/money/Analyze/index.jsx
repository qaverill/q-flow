import * as React from 'react';
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
  const [analysis, setAnalysis] = React.useState(null);
  function loadAnalysis() {
    fetchAnalysis().then(setAnalysis);
  }
  React.useEffect(loadAnalysis, []);
  return (
    <Title>{analysis}</Title>
  );
};

export default Analyze;
