import { easyField, emptyField, figure1 } from './fixtures';
import { store } from './store';
import { setState } from './store/actions';
import { FigureBody } from './types';
import {
  fieldFromFigure,
  moveX,
  moveY,
  wait,
  isUp,
  findCombinations,
  filterGoodCombinations,
} from './utils';

export const solver = async () => {
  let figure: FigureBody = [
    [0, 0],
    [0, 1],
    [0, 2],
  ];

  const combinations = findCombinations(easyField, figure, 2);
  console.log('combinations', combinations);
  const figuresToDisplay = filterGoodCombinations(easyField, combinations);

  for (let i = 0; i < figuresToDisplay.length; i++) {
    const field = figuresToDisplay[i];
    console.log('field', field);
    store.dispatch(
      setState({
        field,
        goodCombinations: [...store.getState().goodCombinations, field],
      })
    );
    await wait(1000);
  }
};
