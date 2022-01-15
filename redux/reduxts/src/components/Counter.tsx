import React from 'react'
import { useDispatch,useSelector } from 'react-redux'
import {CounterStateProps} from '../redux/reducer'
const  Counter=()=> {
    const count=useSelector<CounterStateProps>((state)=>state.counter)
   const dispatch=useDispatch(); 
   const handleChangeSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
     e.preventDefault();
   };
   return (
     <form onSubmit={handleChangeSubmit}>
       Counter Value:{count}
       <br />
       <button onClick={() => dispatch({ type: "increment" })}>+</button>
       <button onClick={() => dispatch({ type: "decrement" })}>-</button>
     </form>
   );
}

export default Counter;
