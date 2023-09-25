import { test, expect, vi } from 'vitest';

const a = [
  [1, 1],
  [1, 0],
];
const b = [
  [0, 0],
  [0, 1],
];
const c = [
  [0, 0],
  [1, 1],
];

test('forEach2', () => {
  const cb = vi.fn();
  [
    [1, 2],
    [3, 4],
  ].forEach2(cb);

  expect(cb).toHaveBeenNthCalledWith(1, 1, 0, 0);
  expect(cb).toHaveBeenNthCalledWith(2, 2, 0, 1);
  expect(cb).toHaveBeenNthCalledWith(3, 3, 1, 0);
  expect(cb).toHaveBeenNthCalledWith(4, 4, 1, 1);
});

test('canOverlap', () => {
  expect(a.canOverlap(b)).toBe(true);
  expect(a.canOverlap(c)).toBe(false);
});

test('overlap', () => {
  expect(a.overlap(b)).toEqual([
    [1, 1],
    [1, 1],
  ]);
});

test('handles different sizes', () => {
  expect(a.overlap([[2]])).toEqual([
    [2, 1],
    [1, 0],
  ]);
  expect(a.canOverlap([[2]])).toBe(false);
});

test('deep copy', () => {
  const origin = [
    [1, 2],
    [3, 4],
  ];
  const copy = origin.deepCopy();
  expect(origin).not.toBe(copy);
  expect(origin[0]).not.toBe(copy[0]);
  expect(origin).toEqual(copy);
});
