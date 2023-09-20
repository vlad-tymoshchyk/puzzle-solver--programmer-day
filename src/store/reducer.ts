import { Reducer, Action } from 'redux';
import { State } from '../types';

export const initialState = {
  counter: 0,
};

export const reducer: Reducer<State, Action> = (state, action) => {
  if (!state) {
    return initialState;
  }

  switch (action.type) {
    case 'increment':
      return { ...state, counter: state.counter + 1 };
  }
};
