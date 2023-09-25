import { HEIGHT, WIDTH } from './constants';
import { FigureBody, Field } from './types';

export function isUp(y: number, x: number) {
  return (y % 2 === 0 && x % 2 === 0) || (y % 2 !== 0 && x % 2 !== 0);
}

export function fromString(str: string): Field {
  return str
    .trim()
    .split('\n')
    .map((row) => {
      return row.split('').map((cell) => {
        return +cell;
      });
    });
}

export const toString = (field: Field): string => {
  return (
    '\n' +
    field
      .map((row) => {
        return row.join('');
      })
      .join('\n') +
    '\n'
  );
};

export function createEmptyField(height: number, width: number) {
  return Array(height)
    .fill(null)
    .map(() => {
      return Array(width).fill(0);
    });
}

export function fieldFromFigure(
  coords: FigureBody,
  value: number = 1,
  height: number = HEIGHT,
  width: number = WIDTH
): Field {
  const field = createEmptyField(height, width);

  coords.forEach(([r_i, c_i]) => {
    if (field[r_i] !== undefined && field[r_i][c_i] !== undefined) {
      field[r_i][c_i] = value;
    }
  });

  return field;
}

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
