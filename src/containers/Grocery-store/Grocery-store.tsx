import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ItemList } from "../../components/Item-list/Item-list";
import { PickedItems } from "../../components/Picked-items/Picked-items";
import { Tabs } from "../../components/Tabs/Tabs";
import {
  fetchItems,
  resetSelection,
  setSelectedItemForCombo,
} from "../../slices/Items/Items.slice";
import {
  fetchCategories,
  setCategory,
} from "../../slices/Items-category/Items-category.slice";
import { RootState } from "../../store";
import { Category, Item } from "../../types";
import "./Grocery-store.css";

export const GroceryStore = () => {
  const dispatch = useDispatch();

  const {
    items,
    selectedItems,
    isFetching: fetchingItems,
  } = useSelector((state: RootState) => state.grocery);

  const {
    categories,
    selectedCategory,
    isFetching: fetchingCategories,
  } = useSelector((state: RootState) => state.categories);

  const [selectedCategoryList, setCategoryList] = useState<Item[]>([]);

  const onTabSelect = (category: Category) => dispatch(setCategory(category));

  const compareComboIds = (arr1: number[], arr2: number[]): boolean => {
    let result = false;
    arr1.forEach((item) => {
      result = arr2.includes(item);
    });
    return result;
  };

  const generateItemList = () => {
    if (selectedCategory && selectedCategory.name) {
      let categoryList = items.filter(
        (item) => item.category === selectedCategory.name
      );
      let filterList: Item[] = [];
      if (Object.keys(selectedItems).length) {
        Object.keys(selectedItems).forEach((key: string) => {
          if (key !== selectedCategory.name) {
            const list = categoryList.filter((item) =>
              compareComboIds(selectedItems[key].comboIds, item.comboIds)
            );
            filterList = [...list];
          }
        });
      } else {
        filterList = [...categoryList];
      }

      setCategoryList([...filterList]);
    }
  };

  useEffect(() => {
    dispatch(fetchItems());
    dispatch(fetchCategories());
  }, []);

  useEffect(() => {
    generateItemList();
  }, [selectedCategory, items.length]);

  const onItemSelect = (item: Item) => {
    dispatch(setSelectedItemForCombo(item));
  };

  const resetComboSelection = () => {
    dispatch(resetSelection());
    dispatch(setCategory(categories[0]));
  };

  const isComboSelectedCompleted =
    Object.keys(selectedItems).length === categories.length;

  if (fetchingItems || fetchingCategories) {
    return <div className="loader"></div>;
  }

  return (
    <div className="container">
      <Tabs
        list={categories}
        onTabClick={onTabSelect}
        selectedTabId={selectedCategory?.id}
        selectedItems={selectedItems}
      />
      <ItemList
        list={selectedCategoryList}
        isComboSelectedCompleted={isComboSelectedCompleted}
        onItemSelect={onItemSelect}
        selectedCategory={selectedCategory}
        selectedItems={selectedItems}
      />

      <PickedItems selectedItems={selectedItems} />

      {isComboSelectedCompleted ||
      (Object.keys(selectedItems).length > 1 &&
        !selectedCategoryList.length) ? (
        <button onClick={resetComboSelection}>Pick Again</button>
      ) : null}
    </div>
  );
};
