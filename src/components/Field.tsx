import React from 'react';
import { CELL_HEIGHT, CELL_SIDE, HEIGHT, WIDTH, colorMap } from '../constants';
import { Field } from '../types';
import { Triangle } from './Triangle';

export function Field({ field }: { field: Field }) {
  return (
    <div style={{ border: '1px solid black' }}>
      <svg height={HEIGHT * CELL_HEIGHT} width={((WIDTH + 1) / 2) * CELL_SIDE}>
        {field.map((row, y) => {
          return row.map((cell, x) => {
            return (
              <Triangle
                key={x + '-' + y}
                x={x}
                y={y}
                color={colorMap.get(cell)}
              />
            );
          });
        })}
      </svg>
    </div>
  );
}
