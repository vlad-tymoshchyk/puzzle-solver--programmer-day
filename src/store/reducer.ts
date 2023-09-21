import { Reducer, Action } from 'redux';
import { State } from '../types';

export const initialState: State = {
  figures: [],
};

export const reducer: Reducer<
  State,
  {
    type: string;
    payload: Partial<State>;
  }
> = (state, action) => {
  if (!state) {
    return initialState;
  }

  switch (action.type) {
    case 'set-state':
      return { ...state, ...action.payload };
  }
};
