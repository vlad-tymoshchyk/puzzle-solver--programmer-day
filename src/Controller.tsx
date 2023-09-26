import React from 'react';
import { Field } from './types';
import { solver } from './solver';

export function doOverlap(...fields: Field[]): boolean {
  return fields.some((currentField, f_i) => {
    const fieldsAfterCurrent = fields.slice(f_i + 1);
    return fieldsAfterCurrent.some((field) => {
      return currentField.some((row, r_i) => {
        return row.some((cell, c_i) => {
          // zero or undefined
          return cell && field[r_i][c_i];
        });
      });
    });
  });
}

export const Controller = () => {
  return (
    <div>
      <button
        onClick={() => {
          solver();
        }}
      >
        Start
      </button>
    </div>
  );
};
