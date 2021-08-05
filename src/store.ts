import { AnyAction, configureStore } from "@reduxjs/toolkit";
import { ThunkAction } from "redux-thunk";
import rootReducer from "../src/slices";
import thunk from "redux-thunk";

const store = configureStore({
  devTools: process.env.NODE_ENV !== "production",
  reducer: rootReducer,
  middleware: [thunk],
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppThunk = ThunkAction<Promise<void>, RootState, null, AnyAction>;
export type AppDispatch = typeof store.dispatch;

export default store;
