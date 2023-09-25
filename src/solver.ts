import { easyField, emptyField, figure1 } from './fixtures';
import { store } from './store';
import { setState } from './store/actions';
import { FigureBody } from './types';
import { fieldFromFigure, moveX, moveY, wait, isUp } from './utils';

export const solver = async () => {
  const figuresToDisplay: FigureBody[] = [];

  let figure: FigureBody = [
    [0, 0],
    [0, 1],
    [0, 2],
  ];

  easyField.forEachEmpty((_, r_i, c_i) => {
    let f: FigureBody = figure.deepCopy();
    const _r_i = r_i - figure[0][0];
    const _c_i = (c_i - figure[0][0]) / 2;
    if (isUp(_r_i, _c_i)) {
      f = moveY(f, _r_i);
      f = moveX(f, _c_i);
      console.log('f', f);
      figuresToDisplay.push(f);
    }
  });

  for (let i = 0; i < figuresToDisplay.length; i++) {
    const figure = figuresToDisplay[i];
    const field = easyField.overlap(fieldFromFigure(figure, 2));
    console.log('field', field);
    store.dispatch(
      setState({
        field,
      })
    );
    await wait(1000);
  }
};
