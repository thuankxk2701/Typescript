import createStore from './server/createStore';
import { counterReducer } from './reducer';


export const store = createStore(counterReducer,)