// ----------------------------------
// HELPERS
// ----------------------------------
const getMonth = (date) => (date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1);
const getDate = (date) => (date.getDate() < 10 ? `0${date.getDate()}` : date.getDate());
// ----------------------------------
// EXPORTS
// ----------------------------------
export const dateToString = (date) => `${getMonth(date)}/${getDate(date)}/${date.getFullYear()}`;

export const timestampToString = (timestamp) => dateToString(new Date(timestamp * 1000));
