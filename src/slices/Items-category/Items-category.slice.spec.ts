import { Category } from "../../types";
import ItemsCategoryReducer, {
  initialState,
  setCategoriesInProgress,
  setCategoriesError,
  fetchCategories,
  setSelectedCategory,
} from "./Items-category.slice";

const dispatch = jest.fn();
const getState = jest.fn();

export const ItemsCategoriesSampleData: Category[] = [
  {
    id: 0,
    name: "chips",
  },
  {
    id: 1,
    name: "drinks",
  },
  {
    id: 2,
    name: "chocolate",
  },
];

describe("Items-categories.slice", () => {
  it("should handle setCategoriesInProgress", async () => {
    const { isFetching, error } = ItemsCategoryReducer(initialState, {
      type: setCategoriesInProgress.type,
    });

    expect(isFetching).toEqual(true);
    expect(error).toEqual(null);
  });

  it("should handle setCategoriesError", () => {
    const { isFetching, error } = ItemsCategoryReducer(initialState, {
      type: setCategoriesError.type,
      payload: { error: "Error!" },
    });

    expect(isFetching).toEqual(false);
    expect(error).toEqual("Error!");
  });

  it("should handle fetchItems success", async () => {
    await fetchCategories()(dispatch, getState, null);
    expect(dispatch).toBeCalledWith({ type: setCategoriesInProgress.type });
  });

  it("should handle setCategory", () => {
    const { selectedCategory } = ItemsCategoryReducer(initialState, {
      type: setSelectedCategory.type,
      payload: ItemsCategoriesSampleData[0],
    });

    expect(selectedCategory).toMatchObject(ItemsCategoriesSampleData[0]);
  });
});
