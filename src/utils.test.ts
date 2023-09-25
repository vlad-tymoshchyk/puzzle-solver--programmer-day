import { test, expect, vi } from 'vitest';
import {
  createEmptyField,
  fieldFromFigure,
  fromString,
  toString,
} from './utils';

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
