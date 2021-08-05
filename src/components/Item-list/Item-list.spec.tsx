import { render } from "@testing-library/react";
import { ItemList, ItemListProps } from "./Item-list";
import { ItemsSampleData } from "../../slices/Items/Items.slice.spec";
import { ItemsCategoriesSampleData } from "../../slices/Items-category/Items-category.slice.spec";

const props: ItemListProps = {
  list: ItemsSampleData,
  selectedCategory: ItemsCategoriesSampleData[1],
  isComboSelectedCompleted: false,
  selectedItems: {},
  onItemSelect: () => {},
};

describe("Item-list component", () => {
  it("should render items list", () => {
    const { getByText } = render(<ItemList {...props} />);

    expect(getByText(/Slanty/i)).toBeInTheDocument();
    expect(getByText(/Coke/i)).toBeInTheDocument();
    expect(getByText(/Cadbury/i)).toBeInTheDocument();
  });

  it("should render empty list text", () => {
    const updatedProps = {
      ...props,
      list: [],
    };
    const { getByText } = render(<ItemList {...updatedProps} />);

    expect(getByText(/No Items available/i)).toBeInTheDocument();
  });
});
