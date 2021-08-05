import { render } from "@testing-library/react";
import { Tabs, TabsProps } from "./Tabs";
import { ItemsCategoriesSampleData } from "../../slices/Items-category/Items-category.slice.spec";

const props: TabsProps = {
  list: ItemsCategoriesSampleData,
  onTabClick: () => {},
  selectedTabId: 0,
  selectedItems: {},
};

describe("Tabs component test cases", () => {
  it("should render Tabs", () => {
    const { getByText } = render(<Tabs {...props} />);

    expect(getByText(/CHIPS/)).toBeInTheDocument();
    expect(getByText(/DRINKS/)).toBeInTheDocument();
    expect(getByText(/CHOCOLATE/)).toBeInTheDocument();
  });
});
