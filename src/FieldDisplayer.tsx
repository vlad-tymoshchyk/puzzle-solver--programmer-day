import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { State } from './types';
import './utils';
import {
  CELL_HEIGHT,
  CELL_SIDE,
  HEIGHT,
  WIDTH,
  colorMap,
  easyField,
} from './constants';

export const FieldDisplayer = () => {
  const figures = useSelector(({ figures }: State) => figures);
  const field = easyField.map((row) => [...row]);

  figures.forEach((figure, i) => {
    const [_y, _x] = figure.leftTop;
    figure.body.forEach(([y, x]) => {
      field[y + _y][x + _x] = i + 2;
    });
  });
  console.log('field', field);

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
};

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
