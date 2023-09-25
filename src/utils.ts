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
  return body.map(([r_i, c_i]) => [r_i, c_i + offset]);
};

export const moveY = (body: FigureBody, offset: number = 1): FigureBody => {
  return body.map(([r_i, c_i]) => [r_i + offset, c_i]);
};

export const flip = (body: FigureBody): FigureBody => {
  const axis = body[0][1];
  return body.map(([r_i, c_i]) => [r_i, axis - (c_i - axis)]);
};

export function findCombinations(
  baseField: Field,
  figure: FigureBody,
  value: number = 1
): Field[] {
  const h = baseField.length;
  const w = baseField[0].length;
  const emptyField = createEmptyField(h, w);
  const combinations: Field[] = [];
  const head_r = figure[0][0];
  const head_c = figure[0][1];

  baseField.forEachEmpty((_, r_i, c_i) => {
    if (isUp(r_i, c_i)) {
      const offset_y = r_i - head_r;
      const offset_x = c_i - head_c;
      let f = moveY(figure, offset_y);
      f = moveX(f, offset_x);
      const fd = fieldFromFigure(f, value, h, w);
      combinations.push(emptyField.overlap(fd));
    }
  });

  return combinations;
}

export function filterGoodCombinations(
  field: Field,
  combinations: Field[]
): Field[] {
  return combinations
    .filter((comb) => field.canOverlap(comb))
    .map((comb) => field.overlap(comb));
}
