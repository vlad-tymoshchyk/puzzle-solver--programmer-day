import React from 'react';
import { CELL_HEIGHT, CELL_SIDE, HEIGHT, WIDTH, colorMap } from '../constants';
import { Field } from '../types';
import { Triangle } from './Triangle';

export function Field({ field, scale }: { field: Field; scale?: number }) {
  const _scale = scale || 1;
  return (
    <div style={{ border: '1px solid black' }}>
      <svg
        height={HEIGHT * CELL_HEIGHT * _scale}
        width={((WIDTH + 1) / 2) * CELL_SIDE * _scale}
      >
        {field.map((row, y) => {
          return row.map((cell, x) => {
            return (
              <Triangle
                key={x + '-' + y}
                x={x}
                y={y}
                color={colorMap.get(cell)}
                scale={_scale}
              />
            );
          });
        })}
      </svg>
    </div>
  );
}
