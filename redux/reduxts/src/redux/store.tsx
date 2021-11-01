import createStore from './server/createStore';
import { counterReducer } from './reducer';
interface IsWindow extends Window {
  __REDUX_DEVTOOLS_EXTENSION__: any;
}
declare const window: IsWindow;

export const store = createStore(
  counterReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);