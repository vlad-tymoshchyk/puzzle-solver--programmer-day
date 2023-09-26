import { Field } from './types';

export {};

Array.prototype.forEach2 = function <T>(
  cb: (cell: T, r_i: number, c_i: number) => void
) {
  this.forEach((row: T[], r_i: number) => {
    if (Array.isArray(row)) {
      row.forEach((cell, c_i) => {
        cb(cell, r_i, c_i);
      });
    } else {
      console.error('Rows should be arrays', this);
    }
  });
};

Array.prototype.canOverlap = function (field: Field) {
  return !this.some((row: number[], r_i: number) => {
    return row.some(
      (cell: number, c_i: number) => cell !== 0 && field[r_i][c_i] !== 0
    );
  });
};

Array.prototype.overlap = function (field: Field) {
  return this.map((row: number[], r_i: number) => {
    return row.map((cell: number, c_i: number) => {
      if (!field[r_i]) {
        return cell;
      } else {
        return field[r_i][c_i] || cell;
      }
    });
  });
};

Array.prototype.deepCopy = function () {
  const copy = this.map((row: number[]) => {
    return row.map((c) => c);
  });
  return copy;
};

Array.prototype.forEachEmpty = function (cb) {
  this.forEach2((cell: number, r_i: number, c_i: number) => {
    if (cell === 0) {
      cb(cell, r_i, c_i);
    }
  });
};

declare global {
  interface Array<T> {
    forEach2: (cb: (cell: T, r_i: number, c_i: number) => void) => void;
    canOverlap: (field: Field) => boolean;
    overlap: (field: Field) => Field;
    deepCopy: <T extends number[][]>() => T;
    forEachEmpty: (cb: (cell: T, r_i: number, c_i: number) => void) => void;
  }
}
