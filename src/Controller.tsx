import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setState } from './store/actions';
import { easyField, figure1 } from './constants';

export const Controller = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      for (let y = 0; y < easyField.length; y++) {
        const row = easyField[y];

        for (let x = 0; x < row.length; x += 2) {
          const cell = row[x];

          await wait(100, () => {
            dispatch(
              setState({
                figures: [
                  {
                    leftTop: [y, x],
                    focused: false,
                    color: 'blue',
                    body: figure1,
                  },
                ],
              })
            );
          });
        }
      }
    })();
  }, [dispatch]);

  return <div>Controller</div>;
};

export const wait = async (time: number, cb: Function) =>
  new Promise<void>((res) => {
    setTimeout(() => {
      cb();
      res();
    }, time);
  });
