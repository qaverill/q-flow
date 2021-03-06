// ----------------------------------
// HELPERS
// ----------------------------------
export const ONE_EPOCH_DAY = 86400;
const getMonth = (date) => (date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1);
// ----------------------------------
// CONVERTERS
// ----------------------------------
export const epochToDate = (epoch) => new Date(epoch * 1000);
export const dateToEpoch = (date) => parseInt(new Date(date).getTime() / 1000, 10);
export const stringToEpoch = (s) => Math.round(new Date(`${s.split('/')[2]}-${s.split('/')[0]}-${s.split('/')[1]}T00:00:00Z`).getTime() / 1000);
export const msToString = (durationInMs) => {
  const hours = parseInt(durationInMs / 3600000, 10);
  const minutes = parseInt(((durationInMs / 1000) % 3600) / 60, 10);
  const seconds = parseInt((durationInMs / 1000) % 60, 10);
  return `${hours < 10 ? `0${hours}` : hours}h ${minutes < 10 ? `0${minutes}` : minutes}m ${seconds < 10 ? `0${seconds}` : seconds}s`;
};

export const round2Decimals = (num) => +((num).toFixed(2));

export const times = {
  firstOfCurrentMonth: () => Math.round(
    new Date(
      new Date().getFullYear(),
      new Date().getMonth() - 7,
      1,
    ) / 1000,
  ),
  now: () => Math.round(new Date().getTime() / 1000),
  getNameOfMonth: (timestamp) => {
    const date = epochToDate(timestamp);
    const month = date.toLocaleString('default', { month: 'long' });
    return month;
  },
  getMonthAndYear: (date) => `${getMonth(date)}/${date.getFullYear().toString().slice(2)}`,
};

export const numberToPrice = (number) => {
  const polarity = number < 0 ? '-' : '';
  const amount = round2Decimals(number < 0 ? number * -1 : number);
  const tail = number % 1 === 0 ? '.00' : '';
  return `${polarity}$${amount}${tail}`;
};

export const copyStringToClipboard = (string) => {
  const el = document.createElement('textarea');
  el.value = string;
  el.setAttribute('readonly', '');
  el.style.position = 'absolute';
  el.style.left = '-9999px';
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
};
