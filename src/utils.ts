import { Field } from './types';

export const fromString = (str: string): Field => {
  let rowLength: number;
  return str
    .trim()
    .split('\n')
    .map((row) => {
      if (!rowLength) {
        rowLength = row.length;
      } else {
        if (row.length !== rowLength) {
          throw new Error(
            'All rows length should be: ' +
              rowLength +
              ', received: ' +
              row.length
          );
        }
      }

      return row.split('').map((cell) => {
        return cell !== '_' ? 1 : 0;
      });
    });
};

const fieldStr = `
______++++++___
_____+++_______
`;

export const assertEqual = (a: any, b: any, msg?: string) => {
  const _a = JSON.stringify(a);
  const _b = JSON.stringify(b);
  console.assert(_a === _b, msg, a, b);
};

assertEqual(
  fromString(fieldStr),
  [
    [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0],
  ],
  'fromString should work correctly'
);
