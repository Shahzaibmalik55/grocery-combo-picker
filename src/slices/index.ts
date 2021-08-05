import { combineReducers } from "redux";
import groceryReducer from "./Items/Items.slice";
import categoriesReducer from "./../slices/Items-category/Items-category.slice";

const rootReducer = combineReducers({
  grocery: groceryReducer,
  categories: categoriesReducer,
});

export default rootReducer;
