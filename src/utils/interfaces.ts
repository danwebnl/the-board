export interface IColumn {
  id: number;
  label: string;
}

export interface ICard {
  id: number;
  task: string;
  columnId: number;
  categories: string[];
}
