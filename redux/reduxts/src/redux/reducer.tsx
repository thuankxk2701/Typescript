
export interface CounterStateProps{
  counter:number;
}
const initialState:CounterStateProps={
    counter:0,
  }
interface ActionProps{
  type:string;
}
 export  function counterReducer(state=initialState,action:ActionProps){
    switch (action.type){
      case 'increment':
        return {counter:state.counter+1};
      case 'decrement':
        return {counter:state.counter-1}
  
      default:return state;
    }
  }