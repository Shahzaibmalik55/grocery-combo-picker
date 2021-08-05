import { Item } from "../types";

const isPropValuesEqual = (subject: any, target: any, propNames: string[]) =>
  propNames.some((propName) => subject[propName] === target[propName]);

export const getUniqueItems = (items: Item[], propNames = ["id", "name"]) =>
  items.filter(
    (item, index, arr) =>
      index ===
      arr.findIndex((foundItem) =>
        isPropValuesEqual(foundItem, item, propNames)
      )
  );
