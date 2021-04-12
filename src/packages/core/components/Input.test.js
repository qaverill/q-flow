import { dateIsValid } from './Input';

test('dateIsValid()', () => {
  expect(dateIsValid('03/21/97')).toEqual(true);
  expect(dateIsValid('3/21/97')).toEqual(true);
  expect(dateIsValid('|3/21/9z')).toEqual(false);
  expect(dateIsValid('03/z1/97')).toEqual(false);
  expect(dateIsValid('z3/21/97')).toEqual(false);
  expect(dateIsValid('/03/21/97')).toEqual(false);
  expect(dateIsValid('03//21/97')).toEqual(false);
});
