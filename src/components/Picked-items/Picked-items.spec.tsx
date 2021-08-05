import { render } from "@testing-library/react";
import { ItemsSampleData } from "../../slices/Items/Items.slice.spec";
import { PickedItems, PickedItemsProps } from "./Picked-items";

const props: PickedItemsProps = {
  selectedItems: {
    chips: ItemsSampleData[0],
    drink: ItemsSampleData[1],
    chocolate: ItemsSampleData[2],
  },
};

describe("Picked-items component test cases", () => {
  it("should render picked items", () => {
    const { getByText } = render(<PickedItems {...props} />);

    expect(getByText(/Picked Items:/)).toBeInTheDocument();
    expect(getByText(/CHIPS:/)).toBeInTheDocument();
    expect(getByText(/DRINK:/)).toBeInTheDocument();
    expect(getByText(/CHOCOLATE:/)).toBeInTheDocument();
  });
});
