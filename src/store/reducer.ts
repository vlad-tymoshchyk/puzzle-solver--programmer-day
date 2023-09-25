import { Reducer } from 'redux';
import { easyField } from '../fixtures';
import { Field } from '../types';

export interface State {
  field: Field;
  goodCombinations: Field[];
}

export const initialState: State = {
  field: easyField,
  goodCombinations: [],
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
