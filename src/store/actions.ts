import { State } from '../store';

export const setState = (payload: Partial<State>) => ({
  type: 'set-state',
  payload,
});
