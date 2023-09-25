import { emptyField } from './constants';
import { CellCoords, FigureBody, Field } from './types';

export function isUp(y: number, x: number) {
  return (y % 2 === 0 && x % 2 === 0) || (y % 2 !== 0 && x % 2 !== 0);
}

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

export const toString = (field: Field): Field => {
  return [];
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

export const fieldFromFigure = (
  coords: FigureBody,
  value: number = 1
): Field => {
  const field = emptyField.deepCopy();

  coords.forEach(([r_i, c_i]) => {
    if (field[r_i] !== undefined && field[r_i][c_i] !== undefined) {
      field[r_i][c_i] = value;
    }
  });

  return field;
};

export const wait = async (time: number, cb?: Function) =>
  new Promise<void>((res) => {
    setTimeout(() => {
      cb && cb();
      res();
    }, time);
  });

export const moveX = (body: FigureBody, offset: number = 1): FigureBody => {
  return body.map(([r_i, c_i]) => [r_i, c_i + offset * 2]);
};

export const moveY = (body: FigureBody, offset: number = 1): FigureBody => {
  return body.map(([r_i, c_i]) => [r_i + offset, c_i]);
};
