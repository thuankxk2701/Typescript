import { createStore } from "react";
import { counterReducer } from "./reducer";
export const store=createStore(
    counterReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__({trace:true}));