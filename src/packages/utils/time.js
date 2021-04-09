// ----------------------------------
// HELPERS
// ----------------------------------
const getMonth = (date) => {
  const month = date.getUTCMonth() + 1;
  return month < 10 ? `0${month}` : date.month;
};
const getDate = (date) => {
  const day = date.getUTCDate();
  return day < 10 ? `0${day}` : day
};
const dateToString = (date) => {
  const month = getMonth(date);
  const day = getDate(date);
  const year = String(date.getFullYear()).slice(2);
  return `${month}/${day}/${year}`;
};
// ----------------------------------
// EXPORTS
// ----------------------------------
export const timestampToString = (timestamp) => dateToString(new Date(timestamp * 1000));

export const stringToTimestamp = (string) => {
  const splitString = string.split('/');
  const month = parseInt(splitString[0]);
  const day = parseInt(splitString[1]);
  const year = parseInt(`20${splitString[2]}`);
  const date = new Date();
  date.setUTCMonth(month - 1);
  date.setUTCDate(day)
  date.setUTCFullYear(year);
  date.setUTCHours(0, 0, 0);
  date.setMilliseconds(0)
  console.log(date)
  return date.getTime() / 1000;
};

export const now = () => {
  const date = new Date();
  return date.getTime() / 1000;
};

export const startOfCurrentMonth = () => {
  const date = new Date();
  date.setUTCDate(1);
  date.setUTCHours(0, 0, 0);
  date.setMilliseconds(0)
  return date.getTime() / 1000;
};
