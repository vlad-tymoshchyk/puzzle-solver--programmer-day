import React, { useEffect, useState } from 'react';
import { Field, FigureBody } from './types';
import { solver } from './solver';
import { useDispatch } from 'react-redux';
import { emptyField, figures_1, map } from './fixtures';
import {
  center,
  coordinatesToIndices,
  fieldFromFigure,
  indicesToCoordinates,
  turnCoordinates,
  r,
  turnFigure,
  moveX,
  createEmptyField,
  moveY,
  flip,
} from './utils';
import { setState } from './store/actions';
import { FIELD_RADIUS, HEIGHT, WIDTH } from './constants';

let figure: FigureBody = [
  [0, 0],
  [0, 1],
  [0, 2],
  [1, 2],
  [1, 3],
  [2, 3],
  [2, 2],
  [3, 2],
];

const startField = createEmptyField(HEIGHT, WIDTH);

// const field = createEmptyField(20, 40);

export const Controller = () => {
  const dispatch = useDispatch();
  const displayFigures = (...figures: FigureBody[]) => {
    let field = startField.deepCopy();
    figures.forEach((figure, i) => {
      field = field.overlap(
        fieldFromFigure(moveX(moveY(figure, 10), 10), i + 1)
      );
    });
    dispatch(setState({ field }));
  };

  const up = () =>
    (figure = moveY(moveX(figure, 1), -1)) && displayFigures(figure);
  const right = () => (figure = moveX(figure, 2)) && displayFigures(figure);
  const down = () =>
    (figure = moveY(moveX(figure, -1), 1)) && displayFigures(figure);
  const left = () => (figure = moveX(figure, -2)) && displayFigures(figure);
  const turnLeft = () =>
    (figure = turnFigure(figure, Math.PI / 3)) && displayFigures(figure);
  const flipFigure = () => (figure = flip(figure)) && displayFigures(figure);

  return (
    <div>
      <button onClick={up}>up</button>
      <button onClick={right}>right</button>
      <button onClick={down}>down</button>
      <button onClick={left}>left</button>
      <button onClick={turnLeft}>turnLeft</button>
      <button onClick={flipFigure}>flipFigure</button>
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
