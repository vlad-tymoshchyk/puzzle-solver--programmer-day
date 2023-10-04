import { r } from './utils';

export const FIELD_RADIUS = 10;

export const CELL_SIDE = 50;
export const CELL_HEIGHT = CELL_SIDE * Math.cos(Math.PI / 6);

export const WIDTH = 20;
export const HEIGHT = 10;

export const colorMap = new Map([
  [0, 'blue'],
  [1, 'black'],
  [2, 'green'],
  [3, 'darkred'],
  [4, 'orange'],
  [5, 'yellow'],
]);

export const DEG = 180 / Math.PI;
export const deg = (degRadian: number) => r(degRadian * DEG, 1);
