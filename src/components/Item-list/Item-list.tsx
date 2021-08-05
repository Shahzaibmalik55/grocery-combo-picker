import { Category, Item, OnClick, SelectedItems } from "../../types";

export interface ItemListProps {
  list: Item[];
  selectedCategory?: Category;
  onItemSelect: OnClick;
  selectedItems: SelectedItems;
  isComboSelectedCompleted: boolean;
}

export const ItemList = ({
  list,
  selectedCategory,
  onItemSelect,
  isComboSelectedCompleted,
  selectedItems,
}: ItemListProps) => {
  return !isComboSelectedCompleted && list.length ? (
    <div className="itemList">
      {list.map((item) => {
        return (
          <label htmlFor={item.name} key={item.id} className="item">
            <input
              type="checkbox"
              onChange={() => onItemSelect(item)}
              value={item.name}
              checked={
                !!selectedCategory &&
                item.id === selectedItems[selectedCategory.name]?.id
              }
            />
            {item.name}
          </label>
        );
      })}
    </div>
  ) : selectedCategory?.name && !list.length ? (
    <h3 className="noItems"> No Items available </h3>
  ) : null;
};
