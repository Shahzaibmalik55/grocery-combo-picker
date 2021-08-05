import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "../../store";
import {
  Category,
  CategoriesStateModel,
  ErrorActionPayload,
  ActionPayload,
} from "../../types";
import { getUniqueItems } from "../../utils/helpers";

export const initialState: CategoriesStateModel = {
  categories: [],
  isFetching: false,
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    setCategoriesInProgress(state): CategoriesStateModel {
      return {
        ...state,
        isFetching: true,
        error: null,
      };
    },
    setCategories(
      state,
      action: PayloadAction<ActionPayload>
    ): CategoriesStateModel {
      const data = getUniqueItems([...action.payload.data]);
      return {
        ...state,
        categories: data,
        selectedCategory: data[0],
        isFetching: false,
      };
    },
    setSelectedCategory(
      state,
      action: PayloadAction<Category>
    ): CategoriesStateModel {
      return {
        ...state,
        selectedCategory: action.payload,
      };
    },
    setCategoriesError(
      state,
      action: PayloadAction<ErrorActionPayload>
    ): CategoriesStateModel {
      return {
        ...state,
        isFetching: false,
        error: action.payload.error,
      };
    },
  },
});

const {
  setSelectedCategory,
  setCategoriesInProgress,
  setCategoriesError,
  setCategories,
} = categoriesSlice.actions;

export const fetchCategories =
  (): AppThunk =>
  async (dispatch): Promise<void> => {
    try {
      dispatch(setCategoriesInProgress());
      fetch("categories.json", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          dispatch(setCategories({ data }));
        });
    } catch (error) {
      dispatch(setCategoriesError({ error }));
    }
  };

export const setCategory =
  (category: Category): AppThunk =>
  async (dispatch): Promise<void> => {
    dispatch(setSelectedCategory(category));
  };
export default categoriesSlice.reducer;
