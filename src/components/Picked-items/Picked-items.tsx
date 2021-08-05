import React from "react";
import { SelectedItems } from "../../types";

export interface PickedItemsProps {
  selectedItems: SelectedItems;
}

export const PickedItems = ({ selectedItems }: PickedItemsProps) => {
  const Items = Object.keys(selectedItems).map((key) => (
    <p className="pickedItem">
      <b>{key.toUpperCase()}:</b>
      <span>
        {selectedItems[key] ? selectedItems[key]?.name : "Not Selected"}
      </span>
    </p>
  ));
  return (
    <div style={{ marginTop: 20 }}>
      Picked Items:
      {Items}
    </div>
  );
};
