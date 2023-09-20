export interface State {
  counter: number;
}

export interface IFigure {
  body: FigureBody;
  leftTop: CellCoords;
  color: string;
  focused: boolean;
}

export type FigureBody = CellCoords[];

export type CellCoords = [number, number];
