import { configureStore } from "@reduxjs/toolkit";
import { productsReducer, usersReducer } from "./reducer";

export const store = configureStore({
  reducer: { productsReducer, usersReducer },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
