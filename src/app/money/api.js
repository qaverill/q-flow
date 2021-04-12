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
export const fetchAnalysis = (timeframe) => new Promise((resolve) => {
  axios.get(`${PATH}/analysis`, timeframe)
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
