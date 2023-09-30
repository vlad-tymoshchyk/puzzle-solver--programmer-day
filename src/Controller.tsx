import React, { useEffect, useState } from 'react';
import { Field, FigureBody } from './types';
import { solver } from './solver';
import { useDispatch } from 'react-redux';
import { emptyField, map } from './fixtures';
import {
  center,
  coordinatesToIndices,
  fieldFromFigure,
  indicesToCoordinates,
  turnCoordinates,
  r,
  turnFigure,
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
  [0, 1],
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

  console.log('map', map);
  console.log(
    map
      .map((row) =>
        row
          .map(
            (cell) =>
              `${cell.coords && r(cell.coords[0])},${
                cell.coords && r(cell.coords[1])
              } `
          )
          .join(' ')
      )
      .join('\n')
  );
  console.log(
    map
      .map((row) =>
        row
          .map(
            (cell) => `${cell.res && cell.res[0]},${cell.res && cell.res[1]} `
          )
          .join(' ')
      )
      .join('\n')
  );
  const experiment = () => {
    const turnedFigure = turnFigure(figure, Math.PI / 6);
    console.log('figure, turnedFigure', figure, turnedFigure);
    figure = turnedFigure;

    dispatch(
      setState({
        field: emptyField.overlap(fieldFromFigure(turnedFigure, 2)),
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
