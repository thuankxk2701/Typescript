import React from "react";
import ReactDOM from 'react-dom';
import { applyMiddleware, createStore } from "redux";
import App from './App';
import postsReducer from "./reducer";
import {Provider} from 'react-redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'

const store= createStore(postsReducer,composeWithDevTools(applyMiddleware(thunk)));

ReactDOM.render(
    <Provider store={store}>
<App/> 
</Provider>,document.getElementById('root'))