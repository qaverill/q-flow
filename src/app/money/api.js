import axios from 'axios';
import * as R from 'ramda';
// ----------------------------------
// HELPERS
// ----------------------------------
const PATH = '/api/money';
// ----------------------------------
// FETCHES
// ----------------------------------
export const fetchTransactions = (timeframe) => new Promise((resolve) => {
  axios.get(`${PATH}/transactions`, timeframe)
    .then(R.compose(
      resolve,
      R.prop('data'),
    ));
});
export const fetchAnalysis = (filter, timeline = {}) => new Promise((resolve) => {
  axios.get('/api/analyze/money', { params: { filter, ...timeline }})
    .then(R.compose(
      resolve,
      R.prop('data'),
    ));
});
// ----------------------------------
// SUBMITS
// ----------------------------------
export const submitPayback = (payback) => new Promise((resolve) => {
  axios.post(`${PATH}/paybacks`, payback)
    .then(resolve)
    .catch((error) => {
      console.error(error);
    });
});
