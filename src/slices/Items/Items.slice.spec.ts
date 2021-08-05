import { Categories, Item } from "../../types";
import ItemsReducer, {
  initialState,
  setItemsInitialState,
  setItemsInProgress,
  setItemsError,
  setSelectedItem,
  emptySelectedItems,
  fetchItems,
} from "./Items.slice";

const dispatch = jest.fn();
const getState = jest.fn();
export const ItemsSampleData: Item[] = [
  {
    id: 0,
    name: "Slanty",
    category: Categories.CHIPS,
    comboIds: [1, 2],
  },
  {
    id: 1,
    name: "Coke",
    category: Categories.DRINKS,
    comboIds: [1, 2],
  },
  {
    id: 2,
    name: "Cadbury",
    category: Categories.CHOCOLATE,
    comboIds: [1, 2],
  },
];

describe("Items.slice", () => {
  it("should handle setGroceryInitialState", () => {
    const { items, isFetching, error } = ItemsReducer(initialState, {
      type: setItemsInitialState.type,
    });

    expect(items.length).toEqual(0);
    expect(isFetching).toEqual(false);
    expect(error).toEqual(undefined);
  });

  it("should handle setItemsInProgress", async () => {
    const { isFetching, error } = ItemsReducer(initialState, {
      type: setItemsInProgress.type,
    });

    expect(isFetching).toEqual(true);
    expect(error).toEqual(null);
  });

  it("should handle setItemsError", () => {
    const { isFetching, error } = ItemsReducer(initialState, {
      type: setItemsError.type,
      payload: { error: "Error!" },
    });

    expect(isFetching).toEqual(false);
    expect(error).toEqual("Error!");
  });

  it("should handle fetchItems success", async () => {
    await fetchItems()(dispatch, getState, null);
    expect(dispatch).toBeCalledWith({ type: setItemsInProgress.type });
  });

  it("should handle setSelectedItemForCombo", () => {
    const { selectedItems } = ItemsReducer(initialState, {
      type: setSelectedItem.type,
      payload: ItemsSampleData[0],
    });

    expect(selectedItems).toMatchObject({ chips: ItemsSampleData[0] });
  });

  it("should handle resetSelection", () => {
    const { selectedItems } = ItemsReducer(initialState, {
      type: emptySelectedItems.type,
    });

    expect(selectedItems).toMatchObject({});
  });
});
