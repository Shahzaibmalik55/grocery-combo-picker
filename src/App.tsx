import React from "react";
import { Provider } from "react-redux";
import store from "../src/store";
import { GroceryStore } from "./containers/Grocery-store/Grocery-store";

function App() {
  return (
    <Provider store={store}>
      <GroceryStore />
    </Provider>
  );
}

export default App;
