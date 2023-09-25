import { test, expect, vi } from 'vitest';
import {
  createEmptyField,
  fieldFromFigure,
  filterGoodCombinations,
  findCombinations,
  flip,
  fromString,
  toString,
  turn,
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
