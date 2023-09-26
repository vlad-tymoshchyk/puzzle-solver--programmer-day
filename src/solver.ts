import { easyField, figure_1_1, figure_1_2, figure_1_3 } from './fixtures';
import { store } from './store';
import { setState } from './store/actions';
import { wait, findCombinations, filterGoodCombinations } from './utils';

export const solver = async () => {
  const figures = [figure_1_1, figure_1_2, figure_1_3];

  for (let i = 0; i < figures.length; i++) {
    const figure = figures[i];
    const combinations = findCombinations(easyField, figure, 2);
    const figuresToDisplay = filterGoodCombinations(easyField, combinations);

    for (let i = 0; i < figuresToDisplay.length; i++) {
      const field = figuresToDisplay[i];
      store.dispatch(
        setState({
          field,
          goodCombinations: [...store.getState().goodCombinations, field],
        })
      );
      await wait(300);
    }
  }
};
