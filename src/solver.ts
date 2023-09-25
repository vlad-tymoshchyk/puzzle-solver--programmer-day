import { easyField } from './constants';
import { store } from './store';
import { setState } from './store/actions';
import { wait } from './utils';

export const solver = async () => {
  for (let i = 0; i < 10; i++) {
    await wait(500);
    store.dispatch(
      setState({
        field: easyField.overlap([
          [2, 2, 2],
          [2, 2, 2],
          [2, 2, 2],
        ]),
      })
    );
  }
};
