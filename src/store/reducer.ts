import { Reducer } from 'redux';
import { easyField } from '../fixtures';
import { Field } from '../types';
import { createEmptyField } from '../utils';

export interface State {
  field: Field;
  goodCombinations: Field[];
  solutions: Field[];
}

export const initialState: State = {
  field: createEmptyField(20, 20),
  goodCombinations: [],
  solutions: [],
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
