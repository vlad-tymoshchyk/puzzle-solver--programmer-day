import React from 'react';
import { CELL_HEIGHT, CELL_SIDE } from '../constants';

export function Triangle({
  x,
  y,
  color,
  scale,
}: {
  x: number;
  y: number;
  color: string;
  scale?: number;
}) {
  const _CELL_HEIGHT = CELL_HEIGHT * scale;
  const _CELL_SIDE = CELL_SIDE * scale;
  const isRowUp = y % 2 === 0;
  const isUp = (isRowUp && x % 2 === 0) || (!isRowUp && x % 2 !== 0);
  if (isUp) {
    const o_y = y * _CELL_HEIGHT;
    const o_x = isRowUp
      ? _CELL_SIDE / 2 + (_CELL_SIDE * x) / 2
      : (_CELL_SIDE * (x + 1)) / 2;

    return (
      <polygon
        points={`${o_x},${o_y} ${o_x + _CELL_SIDE / 2},${o_y + _CELL_HEIGHT} ${
          o_x - _CELL_SIDE / 2
        },${o_y + _CELL_HEIGHT}`}
        fill={color}
      />
    );
  } else {
    const o_y = y * _CELL_HEIGHT + _CELL_HEIGHT;
    const o_x = !isRowUp
      ? _CELL_SIDE / 2 + (_CELL_SIDE * x) / 2
      : (_CELL_SIDE * (x + 1)) / 2;

    return (
      <polygon
        points={`${o_x},${o_y} ${o_x + _CELL_SIDE / 2},${o_y - _CELL_HEIGHT} ${
          o_x - _CELL_SIDE / 2
        },${o_y - _CELL_HEIGHT}`}
        fill={color}
      />
    );
  }
}
