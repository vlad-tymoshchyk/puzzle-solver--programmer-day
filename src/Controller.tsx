import React, { useEffect, useState } from 'react';
import { Field, FigureBody } from './types';
import { solver } from './solver';
import { useDispatch } from 'react-redux';
import { emptyField } from './fixtures';
import {
  coordinatesToIndices,
  fieldFromFigure,
  indicesToCoordinates,
  turnCoordinates,
} from './utils';
import { setState } from './store/actions';

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

let figure: FigureBody = [
  [0, 0],
  [1, 0],
  [1, 1],
  [1, 1],
  [1, 2],
  [1, 3],
  [2, 3],
  [2, 4],
];

export const Controller = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      setState({
        field: emptyField.overlap(fieldFromFigure(figure, 2)),
      })
    );
  }, []);

  const experiment = () => {
    const coords = figure.map(indicesToCoordinates);
    const movedCoords = turnCoordinates(coords, Math.PI / (2 / 3));
    const newFigure: [number, number][] = movedCoords
      .map(coordinatesToIndices)
      .map(([a, b]) => [a + 2, b + 4]);

    figure = newFigure;
    console.log('figure', figure);

    const offsetY = figure.reduce(
      (min, value) => (value[0] < min ? value : min),
      figure[0][0]
    );
    const offsetX = figure.reduce(
      (min, value) => (value[1] < min ? value : min),
      figure[0][1]
    );
    console.log('offsetX, offsetY', offsetX, offsetY);

    dispatch(
      setState({
        field: emptyField.overlap(fieldFromFigure(figure, 2)),
      })
    );
  };

  return (
    <div>
      <button onClick={experiment}>Experiment</button>
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
