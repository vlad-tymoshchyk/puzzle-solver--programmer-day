import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setState } from './store/actions';
import { easyField, figure1 } from './fixtures';
import { Field } from './types';
import { solver } from './solver';
import { isUp } from './utils';

export function doOverlap(...fields: Field[]): boolean {
  return fields.some((currentField, f_i) => {
    const fieldsAfterCurrent = fields.slice(f_i + 1);
    return fieldsAfterCurrent.some((field) => {
      return currentField.some((row, r_i) => {
        return row.some((cell, c_i) => {
          // zero or undefined
          return cell && field[r_i][c_i];
        });
      });
    });
  });
}

export const Controller = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      for (let y = 0; y < easyField.length; y++) {
        const row = easyField[y];

        for (let x = 0; x < row.length; x += 1) {
          // console.log('isUp(y, x)', y, x, isUp(y, x));
          if (!isUp(y, x)) {
            continue;
          }

          const cell = row[x];

          // await wait(100, () => {
          //   dispatch(
          //     setState({
          //       figures: [
          //         {
          //           leftTop: [y, x],
          //           focused: false,
          //           color: 'blue',
          //           body: figure1,
          //         },
          //       ],
          //     })
          //   );
          // });
        }
      }
    })();
  }, [dispatch]);

  return (
    <div>
      <button
        onClick={() => {
          solver();
        }}
      >
        Start
      </button>
    </div>
  );
};
