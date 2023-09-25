import { FigureBody } from './types';
import { fromString } from './utils';

export const emptyField = fromString(`
__________________
__________________
__________________
__________________
__________________
__________________
__________________
__________________
`);

export const easyField = fromString(`
++++++++++++++++++
++++++++++++++++++
++++++++++___+++++
+++++++______+++++
+++++++++___++++++
++++++++++++++++++
++++++++++++++++++
++++++++++++++++++
`);

// export const easyField = fromString(`
// ++++++++++++++++++
// +++++++++++___++++
// ++++___________+++
// +++_____________++
// +++_____________++
// ++++____________++
// +++++++_________++
// ++++++++++++++++++
// `);

export const figure1: FigureBody = [
  [0, 1],
  [0, 0],
  [1, 0],
  [1, 1],
  [2, 1],
  [2, 2],
  [2, 3],
  [2, 4],
  [2, 5],
  [2, 6],
  [2, 7],
  [1, 7],
  [1, 8],
];
