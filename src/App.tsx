import React, { useEffect, useRef } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { Center } from './components/Center';
import { FieldDisplayer } from './FieldDisplayer';
import { Controller } from './Controller';
import { store } from './store';
import { shiftPoint, turnCoordinates } from './utils';

export const App = () => {
  return (
    <ReduxProvider store={store}>
      <div className="container">
        <Center>
          <FieldDisplayer />
        </Center>
        <Center>
          <Controller />
        </Center>
      </div>
    </ReduxProvider>
  );
};

const CANVAS_WIDTH = 200;
const CANVAS_HEIGHT = 100;
export function Test() {
  const canvasRef = useRef<HTMLCanvasElement>();
  const zero_canvas_x = CANVAS_WIDTH / 2;
  const zero_canvas_y = CANVAS_HEIGHT / 2;
  const to_canvas_x = (x: number) => zero_canvas_x + x;
  const to_x = (canvas_x: number) => canvas_x - zero_canvas_x;
  const to_canvas_y = (y: number) => zero_canvas_y - y;
  const to_y = (canvas_y: number) => -canvas_y + zero_canvas_y;

  useEffect(() => {
    const ctx = canvasRef.current.getContext('2d');
    ctx.fillRect(zero_canvas_x, zero_canvas_y, 3, 3);
    let x = to_canvas_x(0);
    let y = to_canvas_y(50);
    setInterval(() => {
      ctx.fillRect(x, y, 3, 3);

      const [new_x, new_y] = shiftPoint(
        [to_x(x), to_y(y)],
        -(Math.PI / 180) * 3
      );
      [x, y] = [to_canvas_x(new_x), to_canvas_y(new_y)];
    }, 1000);
  }, []);

  return (
    <div>
      <canvas
        ref={canvasRef}
        id="canvas"
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
        style={{ border: '1px solid black' }}
      />
    </div>
  );
}
