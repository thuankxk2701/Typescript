import React from 'react'
import { useDispatch,useSelector } from 'react-redux'
import {CounterStateProps} from '../redux/reducer'
const  Counter=()=> {
    const count=useSelector<CounterStateProps>((state)=>state.counter)
   const dispatch=useDispatch(); 
   
    return (
        <div>
            Counter Value:{count}
            <br/>
            <button onClick={()=>dispatch({type:'increment'})}>+</button>
            <button onClick={()=> dispatch({type:'decrement'})}>-</button>
            
        </div>
    )
}

export default Counter;
