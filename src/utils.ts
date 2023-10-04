import { HEIGHT, WIDTH, deg } from './constants';
import { FigureBody, Field } from './types';

export function getBaseAngle(x: number, y: number): number {
  let angle: number;
  if (y === 0 && x >= 0) {
    angle = 0;
  } else if (x > 0 && y > 0) {
    angle = Math.atan(y / x);
  } else if (x === 0 && y >= 0) {
    angle = Math.PI / 2;
  } else if (x < 0 && y > 0) {
    angle = Math.PI - Math.atan(y / -x);
  } else if (y === 0 && x < 0) {
    angle = Math.PI;
  } else if (x < 0 && y < 0) {
    angle = Math.atan(-y / -x) + Math.PI;
  } else if (x === 0 && y < 0) {
    angle = Math.PI * (3 / 2);
  } else if (x > 0 && y < 0) {
    angle = Math.PI * 2 - Math.atan(-y / x);
  } else {
    throw new Error('No condition worked , x:' + x + ', y:' + y);
  }

  return angle;
}

export function isUp([y, x]: [number, number]) {
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
    if (isUp([r_i, c_i])) {
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

export const _smallSide = (1 / 2) * Math.tan(Math.PI / 6);
export const _bigSide = 1 / 2 / Math.cos(Math.PI / 6);
export const _height = _smallSide + _bigSide;
export const _d = _bigSide - _smallSide;
console.log('_smallSide', _smallSide);
console.log('_bigSide', _bigSide);
console.log('_height', _height);

export function getYDistance([r1, c1], [r2, c2]) {
  const fullCellsInBetween = Math.abs(r1 - r2) - 1;
  let distance = fullCellsInBetween * (_smallSide + _bigSide);
  if (r1 < r2) {
    if (isUp([r1, c1])) {
      distance += _smallSide;
    } else {
      distance += _bigSide;
    }

    if (isUp([r2, c2])) {
      distance += _bigSide;
    } else {
      distance += _smallSide;
    }
  } else if (r1 > r2) {
    if (isUp([r1, c1])) {
      distance += _bigSide;
    } else {
      distance += _smallSide;
    }

    if (isUp([r2, c2])) {
      distance += _smallSide;
    } else {
      distance += _bigSide;
    }
  } else {
    if (
      (isUp([r1, c1]) && isUp([r2, c2])) ||
      (!isUp([r1, c1]) && !isUp([r2, c2]))
    ) {
      distance = 0;
    } else {
      distance = _bigSide - _smallSide;
    }
  }

  return distance;
}

export function getXDistance(c1: number, c2: number) {
  return Math.abs(c1 - c2) * 0.5;
}

export function ang(angle: number) {
  return (angle / Math.PI) * 180;
}

export function r(num: number, count: number = 5): number {
  const multiplier = 10 ** count;
  const res = Math.round(num * multiplier) / multiplier;
  return res;
}
export function shiftPoint([x, y], shiftAngle: number): [number, number] {
  if (x === 0 && y === 0) {
    return [0, 0];
  }

  const baseAngle = getBaseAngle(x, y);
  const angle = baseAngle + shiftAngle;
  // console.log('baseAngle * deg', baseAngle * deg);
  // console.log('shiftAngle * deg', shiftAngle * deg);
  // console.log('angle', angle * deg);
  const hyp = Math.sqrt(x ** 2 + y ** 2);
  // console.log(
  //   'hyp, angle * deg, Math.cos(angle)',
  //   hyp,
  //   angle * deg,
  //   Math.sin(angle)
  // );
  const res: [number, number] = [
    r(Math.cos(angle) * hyp, 7),
    r(Math.sin(angle) * hyp, 7),
  ];
  return res;
}

export function turnCoordinates(
  coords: [number, number][],
  angle: number
): [number, number][] {
  const newFigureCoordinates = coords.map(([x, y]) => {
    const shifted = shiftPoint([x, y], angle);
    return shifted;
  });
  return newFigureCoordinates;
}

export function indicesToCoordinates([r_i, c_i]: [number, number]): [
  number,
  number
] {
  return [
    c_i * 0.5,
    -(r_i * _height + (isUp([r_i, c_i]) ? _bigSide : _smallSide)),
  ];
}

export function floor(i: number): number {
  return Math.floor(i) + (i < 0 ? 1 : 0);
}

export function coordinatesToIndices([x, y]: [number, number]): [
  number,
  number
] {
  if (Array.isArray(x) || Array.isArray(y)) {
    console.log('ERROR, NESTED ARRAY', x, y);
    console.trace();
  }
  const r_i = floor(-y / _height) + (y > 0 ? -1 : 0);
  const c_i = x / 0.5;
  const indices: [number, number] = [Math.round(r_i), Math.round(c_i)];

  return indices;
}

export function center(figure: FigureBody, padding: number = 0): FigureBody {
  const offset_r = Math.min(...figure.map(([r_i]) => r_i));
  const offset_c = Math.min(...figure.map(([_, c_i]) => c_i));

  let shift_r = -Math.floor(offset_r / 2) * 2;
  let shift_c = -Math.floor(offset_c / 2) * 2;

  if (offset_r + shift_r === 1 && offset_c + shift_c === 1) {
    shift_r -= 1;
    shift_c -= 1;
  }

  const centeredFigure: FigureBody = figure.map(([r_i, c_i]) => [
    r_i + shift_r + padding,
    c_i + shift_c + padding,
  ]);

  return centeredFigure;
}

export function turnFigure(figure: FigureBody, angle: number): FigureBody {
  const coords = figure.map(indicesToCoordinates);
  const turnedCoords = turnCoordinates(coords, angle);
  const turnedFigure = turnedCoords.map(coordinatesToIndices);
  console.log(
    'figure, turnedFigure',
    figure,
    turnedFigure,
    center(turnedFigure)
  );

  // if (!isUp(turnedFigure[0])) {
  //   if (!isUp(turnedFigure[1])) {
  //     throw new Error('If first triangle is not up, the second should be');
  //   }

  //   const second = turnedFigure[1];
  //   turnedFigure[1] = turnedFigure[0];
  //   turnedFigure[0] = second;
  // }

  return center(turnedFigure);
}
