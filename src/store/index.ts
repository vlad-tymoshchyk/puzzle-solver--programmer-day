import { createStore } from 'redux';
import { reducer } from './reducer';

export const store = createStore(
  reducer,
  // eslint-disable-next-line
  // @ts-ignore
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
    // eslint-disable-next-line
    // @ts-ignore
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ name: 'Puzzle braker' })()
);
