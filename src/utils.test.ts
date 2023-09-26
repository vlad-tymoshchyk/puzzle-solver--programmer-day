import { test, expect, vi } from 'vitest';
import {
  _bigSide,
  _height,
  _smallSide,
  createEmptyField,
  fieldFromFigure,
  filterGoodCombinations,
  findCombinations,
  flip,
  fromString,
  shiftPoint,
  getXDistance,
  getYDistance,
  toString,
  turn120,
  turn60,
  getBaseAngle,
} from './utils';
import { FigureBody } from './types';

test('fromString', () => {
  expect(
    fromString(`
012
123
234
`)
  ).toEqual([
    [0, 1, 2],
    [1, 2, 3],
    [2, 3, 4],
  ]);
});

test('toString', () => {
  expect(
    toString([
      [0, 0, 1],
      [0, 1, 2],
      [1, 2, 3],
    ])
  ).toBe(`
001
012
123
`);
});

test('createEmptyField', () => {
  expect(createEmptyField(2, 3)).toEqual([
    [0, 0, 0],
    [0, 0, 0],
  ]);
});

test('fieldFromFigure', () => {
  expect(
    fieldFromFigure(
      [
        [0, 0],
        [0, 1],
        [1, 1],
        [1, 2],
      ],
      9,
      2,
      3
    )
  ).toEqual([
    [9, 9, 0],
    [0, 9, 9],
  ]);
});

test('findCombinations', () => {
  const baseField = fromString(`
11111
10001
10001
11111
`);
  const figure: FigureBody = [
    [0, 0],
    [0, 1],
    [0, 2],
    [1, 2],
  ];
  const result = findCombinations(baseField, figure, 2);

  expect(result.map(toString)).toEqual([
    `
00000
02220
00020
00000
`,
    `
00000
00022
00000
00000
`,
    `
00000
00000
00222
00002
`,
  ]);

  expect(filterGoodCombinations(baseField, result).map(toString)).toEqual([
    `
11111
12221
10021
11111
`,
  ]);
});

test('flip', () => {
  const figure: FigureBody = [
    [1, 1],
    [2, 1],
    [2, 2],
    [2, 3],
    [1, 3],
  ];
  expect(flip(figure)).toEqual([
    [1, 1],
    [2, 1],
    [2, 0],
    [2, -1],
    [1, -1],
  ]);
});

test('getYDistance', () => {
  expect(getYDistance([0, 0], [0, 1])).toBe(_bigSide - _smallSide);
  expect(getYDistance([0, 1], [0, 0])).toBe(_bigSide - _smallSide);
  expect(getYDistance([0, 0], [0, 2])).toBe(0);

  expect(getYDistance([0, 0], [1, 0])).toBe(_smallSide + _smallSide);
  expect(getYDistance([0, 0], [1, 1])).toBe(_smallSide + _bigSide);
  expect(getYDistance([1, 0], [2, 0])).toBe(_bigSide + _bigSide);
  expect(getYDistance([1, 0], [2, 1])).toBe(_bigSide + _smallSide);
  expect(getYDistance([0, 0], [2, 0])).toBe(_smallSide + _height + _bigSide);

  // second point is higher
  expect(getYDistance([1, 0], [0, 0])).toBe(_smallSide + _smallSide);
  expect(getYDistance([1, 1], [0, 0])).toBe(_smallSide + _bigSide);
  expect(getYDistance([2, 0], [1, 0])).toBe(_bigSide + _bigSide);
  expect(getYDistance([2, 1], [1, 0])).toBe(_bigSide + _smallSide);
  expect(getYDistance([2, 0], [0, 0])).toBe(_smallSide + _height + _bigSide);
});

test('getXDistance', () => {
  expect(getXDistance(0, 0)).toBe(0);
  expect(getXDistance(0, 1)).toBe(0.5);
  expect(getXDistance(1, 0)).toBe(0.5);
  expect(getXDistance(0, 2)).toBe(1);
});

test('getBaseAngle', () => {
  expect(getBaseAngle(0, 0)).toBe(0);
  expect(getBaseAngle(5, 0)).toBe(0);
  expect(getBaseAngle(5, 5)).toBe(Math.PI / 4);
  expect(getBaseAngle(0, 5)).toBe(Math.PI / 2);
  expect(getBaseAngle(-5, 5)).toBe(Math.PI * (3 / 4));
  expect(getBaseAngle(-5, 0)).toBe(Math.PI);
  expect(getBaseAngle(-5, -5)).toBe(Math.PI * (5 / 4));
  expect(getBaseAngle(0, -5)).toBe(Math.PI * (3 / 2));
});

test('shiftPoint', () => {
  expect(shiftPoint([0, 0], Math.PI / 2)).toEqual([0, 0]);
  expect(shiftPoint([5, 0], Math.PI / 2)).toEqual([0, 5]);
  expect(shiftPoint([0, 5], Math.PI / 2)).toEqual([-5, 0]);
  expect(shiftPoint([-5, 0], Math.PI / 2)).toEqual([-0, -5]);
  expect(shiftPoint([0, -5], Math.PI / 2)).toEqual([5, -0]);

  expect(shiftPoint([2, 2], Math.PI / 2)).toEqual([-2, 2]);
});

test('turn60', () => {
  const res = turn60([[0, 1]]);
  // expect(res).toEqual([
  //   [0, 1],
  //   [0, 2],
  // ]);
});

test.skip('turn', () => {
  expect(
    turn120([
      [0, 0],
      [1, 0],
    ])
  ).toEqual([
    [0, 0],
    [0, -1],
  ]);
});
