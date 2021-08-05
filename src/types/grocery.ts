export interface ActionPayload {
  data?: any;
}

export interface ErrorActionPayload {
  error: any;
}

export interface OnClick {
  (..._args: any[]): void;
}

export enum Categories {
  CHIPS = "chips",
  DRINKS = "drinks",
  CHOCOLATE = "chocolate",
}

export interface Item {
  id: number;
  name: string;
  comboIds: number[];
  category: Categories;
}

export interface Category {
  id: number;
  name: string;
}

export interface SelectedItems {
  [x: string]: Item;
}

export interface CategoriesStateModel {
  categories: Category[];
  isFetching: boolean;
  selectedCategory?: Category;
  error?: any;
}

export interface ItemsStateModel {
  items: Item[];
  selectedItems: SelectedItems;
  isFetching: boolean;
  error?: any;
}
