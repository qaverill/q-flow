import axios from 'axios';
// ----------------------------------
// HELPERS
// ----------------------------------
const PATH = '/api/money';
// ----------------------------------
// FETCHERS
// ----------------------------------
export const fetchTransactions = (timeframe) => new Promise((resolve) => {
  axios.get(`${PATH}/transactions`, timeframe).then(({ data }) => {
    resolve(data);
  });
});
export const submitPayback = (payback) => new Promise((resolve) => {
  axios.post(`${PATH}/paybacks`, payback)
    .then(resolve)
    .catch((error) => {
      console.error(error);
    });
});
