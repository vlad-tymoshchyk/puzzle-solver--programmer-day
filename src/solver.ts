import {
  easyField,
  hardField,
  figures_1,
  figures_2,
  figures_3,
  figures_4,
} from './fixtures';
import { store } from './store';
import { setState } from './store/actions';
import { Field } from './types';
import { wait, findCombinations, filterGoodCombinations } from './utils';

export const solver = async () => {
  let figuresToDisplay: Field[] = [];
  let solutions: Field[] = [];

  figures_1.forEach((figure) => {
    const combinations = findCombinations(hardField, figure, 2);
    const goodCombinations = filterGoodCombinations(hardField, combinations);

    goodCombinations.forEach((field_1) => {
      figuresToDisplay.push(field_1);

      figures_2.forEach((figure) => {
        const combinations = findCombinations(field_1, figure, 3);
        const goodCombinations = filterGoodCombinations(field_1, combinations);

        goodCombinations.forEach((field_2) => {
          figuresToDisplay.push(field_2);

          figures_3.forEach((figure) => {
            const combinations = findCombinations(field_2, figure, 4);
            const goodCombinations = filterGoodCombinations(
              field_2,
              combinations
            );

            // solutions = [...solutions, ...goodCombinations];

            goodCombinations.forEach((field_3) => {
              figuresToDisplay.push(field_3);

              figures_4.forEach((figure) => {
                const combinations = findCombinations(field_3, figure, 5);
                const goodCombinations = filterGoodCombinations(
                  field_3,
                  combinations
                );

                figuresToDisplay = [...figuresToDisplay, ...goodCombinations];
                solutions = [...solutions, ...goodCombinations];
              });
            });
          });
        });
      });
    });
  });

  console.log('solutions.length', solutions.length);

  store.dispatch(
    setState({
      solutions,
    })
  );

  for (let i = 0; i < figuresToDisplay.length; i++) {
    const field = figuresToDisplay[i];
    store.dispatch(
      setState({
        field,
        goodCombinations: [...store.getState().goodCombinations, field],
        // solutions: [
        //   ...store.getState().solutions,
        //   ...(solutions.includes(field) ? [field] : []),
        // ],
      })
    );
    await wait(50);
  }
};
