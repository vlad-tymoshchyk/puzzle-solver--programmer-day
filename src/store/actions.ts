import { State } from '../types';

export const setState = (payload: Partial<State>) => ({
  type: 'set-state',
  payload,
});
