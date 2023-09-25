import React from 'react';
import { CELL_HEIGHT, CELL_SIDE } from '../constants';

export function Triangle({
  x,
  y,
  color,
}: {
  x: number;
  y: number;
  color: string;
}) {
  const isRowUp = y % 2 === 0;
  const isUp = (isRowUp && x % 2 === 0) || (!isRowUp && x % 2 !== 0);
  if (isUp) {
    const o_y = y * CELL_HEIGHT;
    const o_x = isRowUp
      ? CELL_SIDE / 2 + (CELL_SIDE * x) / 2
      : (CELL_SIDE * (x + 1)) / 2;

    return (
      <polygon
        points={`${o_x},${o_y} ${o_x + CELL_SIDE / 2},${o_y + CELL_HEIGHT} ${
          o_x - CELL_SIDE / 2
        },${o_y + CELL_HEIGHT}`}
        fill={color}
      />
    );
  } else {
    const o_y = y * CELL_HEIGHT + CELL_HEIGHT;
    const o_x = !isRowUp
      ? CELL_SIDE / 2 + (CELL_SIDE * x) / 2
      : (CELL_SIDE * (x + 1)) / 2;

    return (
      <polygon
        points={`${o_x},${o_y} ${o_x + CELL_SIDE / 2},${o_y - CELL_HEIGHT} ${
          o_x - CELL_SIDE / 2
        },${o_y - CELL_HEIGHT}`}
        fill={color}
      />
    );
  }
}
