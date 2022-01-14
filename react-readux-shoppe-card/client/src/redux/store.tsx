import { configureStore } from "@reduxjs/toolkit";
import { productsReducer, usersReducer, countsReducer } from "./reducer";

export const store = configureStore({
  reducer: { productsReducer, usersReducer, countsReducer },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
