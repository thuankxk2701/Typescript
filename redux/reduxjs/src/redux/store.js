import  createStore  from "./server/createStore";
import { counterReducer } from "./reducer.js";

export const store = createStore(
  counterReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);