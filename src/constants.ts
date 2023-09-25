import { FigureBody } from './types';
import { fromString } from './utils';

export const CELL_SIDE = 50;
export const CELL_HEIGHT = CELL_SIDE * Math.cos(Math.PI / 6);

export const easyField = fromString(`
++++++++++++++++++
+++++++++++___++++
++++___________+++
+++_____________++
+++_____________++
++++____________++
+++++++_________++
++++++++++++++++++
`);

export const figure1: FigureBody = [
  [0, 1],
  [0, 0],
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

export const WIDTH = 18;
export const HEIGHT = 8;

export const colorMap = new Map([
  [0, 'blue'],
  [1, 'black'],
  [2, 'green'],
  [3, 'red'],
  [4, 'orange'],
  [5, 'yellow'],
]);
