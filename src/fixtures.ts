import { FigureBody } from './types';
import {
  coordinatesToIndices,
  fromString,
  indicesToCoordinates,
  shiftPoint,
  turnCoordinates,
} from './utils';

export const emptyField = fromString(`
000000000000000000
000000000000000000
000000000000000000
000000000000000000
000000000000000000
000000000000000000
000000000000000000
000000000000000000
`);

// export const easyField = fromString(`
// 111111111111111111
// 111111111111111111
// 111111111100011111
// 111111100000011111
// 111111111000111111
// 111111111111111111
// 111111111111111111
// 111111111111111111
// `);

export const easyField = fromString(`
111111111111111111
111111111110001111
111100000000000111
111000000000000011
111000000000000011
111100000000000011
111111100000000011
111111111111111111
`);

export const figure_1_1: FigureBody = [
  [0, 0],
  [0, 1],
  [1, 0],
  [1, 1],
  [2, 1],
  [2, 2],
  [2, 3],
  [2, 4],
  [2, 5],
  [2, 6],
  [2, 7],
  [1, 7],
  [1, 8],
];

export const figure_1_2: FigureBody = [
  [0, 0],
  [0, 1],
  [0, 2],
  [1, 0],
  [1, -1],
  [2, -1],
  [2, 0],
  [3, 0],
  [3, 1],
  [4, 1],
  [4, 2],
  [4, 3],
  [4, 4],
];

export const figure_1_3: FigureBody = [
  [0, 0],
  [0, 1],
  [0, 2],
  [0, 3],
  [0, 4],
  [1, 4],
  [1, 0],
  [1, -1],
  [2, -1],
  [2, -2],
  [3, -2],
  [3, -1],
  [4, -1],
];

export const MAP_SIDE = 2;
export const getMapIndex = ([x, y]) => {
  return [MAP_SIDE + x, MAP_SIDE + y];
};
export const map = Array(MAP_SIDE * 2 + 1)
  .fill(null)
  .map((_, r_i) => {
    const [zero_r, zero_c] = getMapIndex([0, 0]);
    return Array(MAP_SIDE * 2 + 1)
      .fill(null)
      .map((_, c_i) => {
        if (r_i === zero_r && c_i === zero_c) {
          return {
            60: [0, 0],
            // 120: [0, 0],
            // 180: [0, 0],
            // 240: [0, 0],
            // 300: [0, 0],
          };
        }

        const [ri, ci] = getMapIndex([r_i - MAP_SIDE * 2, c_i - MAP_SIDE * 2]);
        const coords: [number, number] = indicesToCoordinates([ri, ci]);
        const turnedCoords = shiftPoint(coords, (2 * Math.PI) / 3);
        console.log('turnedCoords', turnedCoords);
        const res = coordinatesToIndices(turnedCoords);

        if (
          res.some((num) => {
            return num % 1 !== 0;
          })
        ) {
          console.log('NOT INTEGER INDEX:', {
            r_i,
            c_i,
            coords,
            turnedCoords,
            res,
          });
        }
        return {
          coords,
          turnedCoords,
          res,
          60: res,
        };
      });
  });
