import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "../../store";
import {
  ActionPayload,
  ErrorActionPayload,
  ItemsStateModel,
  Item,
} from "../../types";
import { getUniqueItems } from "../../utils/helpers";

export const initialState: ItemsStateModel = {
  items: [],
  selectedItems: {},
  isFetching: false,
};

const ItemsSlice = createSlice({
  name: "grocery",
  initialState,
  reducers: {
    setItemsInitialState(): ItemsStateModel {
      return {
        ...initialState,
      };
    },
    setItemsInProgress(state): ItemsStateModel {
      return {
        ...state,
        isFetching: true,
        error: null,
      };
    },
    setItems(state, action: PayloadAction<ActionPayload>): ItemsStateModel {
      return {
        ...state,
        items: getUniqueItems([...action.payload.data]),
        isFetching: false,
      };
    },
    setItemsError(
      state,
      action: PayloadAction<ErrorActionPayload>
    ): ItemsStateModel {
      return {
        ...state,
        isFetching: false,
        error: action.payload.error,
      };
    },
    emptySelectedItems(state): ItemsStateModel {
      return {
        ...state,
        selectedItems: {},
      };
    },
    setSelectedItem(state, action: PayloadAction<Item>): ItemsStateModel {
      return {
        ...state,
        selectedItems: {
          ...state.selectedItems,
          [action.payload.category]: action.payload,
        },
      };
    },
  },
});

export const {
  setItemsInProgress,
  setItemsError,
  setItems,
  emptySelectedItems,
  setSelectedItem,
  setItemsInitialState,
} = ItemsSlice.actions;

export const fetchItems =
  (): AppThunk =>
  async (dispatch): Promise<void> => {
    try {
      dispatch(setItemsInProgress());
      fetch("items.json", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }).then(async (response) => {
        const data = await response.json();
        dispatch(setItems({ data }));
      });
    } catch (error) {
      dispatch(setItemsError({ error }));
    }
  };

export const setSelectedItemForCombo =
  (item: Item): AppThunk =>
  async (dispatch): Promise<void> => {
    dispatch(setSelectedItem(item));
  };

export const resetSelection =
  (): AppThunk =>
  async (dispatch): Promise<void> => {
    dispatch(emptySelectedItems());
  };

export default ItemsSlice.reducer;
