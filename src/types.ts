export interface State {
  figures: IFigure[];
}

export interface IFigure {
  body: FigureBody;
  leftTop: CellCoords;
  color: string;
  focused: boolean;
}

export type FigureBody = CellCoords[];

export type Field = number[][];

export type CellCoords = [number, number];
