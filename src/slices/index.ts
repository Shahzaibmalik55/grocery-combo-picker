import { combineReducers } from "redux";
import groceryReducer from "./Items/Items.slice";
import itemsReducer from "./../slices/Items-category/Items-category.slice";

const rootReducer = combineReducers({
  items: groceryReducer,
  categories: itemsReducer,
});

export default rootReducer;
