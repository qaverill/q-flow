import { timestampToString, stringToTimestamp, now, startOfCurrentMonth } from './index';
// ----------------------------------
// HELPERS
// ----------------------------------
const timestamp = 1617926400;
const string = '04/09/21';
// ----------------------------------
// TESTS
// ----------------------------------
test('timestampToString', () => {
  expect(
    timestampToString(timestamp)
  ).toEqual(string);
});
test('stringToTimestamp', () => {
  expect(
    stringToTimestamp(string)
  ).toEqual(timestamp);
});
test('now', () => {
  const result = now();
  expect(typeof result).toEqual('number');
  expect(result).toBeGreaterThan(timestamp);
});
test('startOfCurrentMonth', () => {
  const nowResult = now();
  const result = startOfCurrentMonth();
  const resultString = timestampToString(result);
  expect(result).toEqual(1617235200);
  expect(resultString).toEqual('04/01/21')
  expect(result).toBeLessThan(nowResult);
  expect(resultString.split('/')[1]).toEqual('01');
});
