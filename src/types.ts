export interface State {
  field: IField;
}

export interface IFigure {
  body: FigureBody;
  leftTop: CellCoords;
  color: string;
  focused: boolean;
}

export type FigureBody = CellCoords[];

export type IField = number[][];

export type CellCoords = [number, number];
