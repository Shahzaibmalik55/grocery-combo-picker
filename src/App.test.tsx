import React from "react";
import { render } from "@testing-library/react";
import App from "./App";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { ItemsSampleData } from "./slices/Items/Items.slice.spec";
import { ItemsCategoriesSampleData } from "./slices/Items-category/Items-category.slice.spec";

const mockStore = configureStore([thunk]);

const mockStoreState = {
  items: {
    items: ItemsSampleData,
    selectedItems: {},
    isFetching: false,
  },
  categories: {
    categories: ItemsCategoriesSampleData,
    isFetching: false,
    selectedCategory: {},
  },
};

const store = mockStore(mockStoreState);

describe("App test cases", () => {
  it("renders Categories", () => {
    const { getByText } = render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    expect(getByText(/CHIPS/i)).toBeInTheDocument();
    expect(getByText(/DRINKS/i)).toBeInTheDocument();
    expect(getByText(/CHOCOLATE/i)).toBeInTheDocument();
  });
});
