import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { State } from './types';

export const FieldDisplayer = () => {
  const counter = useSelector(({ counter }: State) => counter);
  const dispatch = useDispatch();

  return (
    <div>
      FieldDisplayer: {counter}
      <br />
      <button
        onClick={() => {
          dispatch({ type: 'increment' });
        }}
      >
        Increment
      </button>
    </div>
  );
};
