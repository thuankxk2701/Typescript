import React from 'react'
import { connect } from 'react-redux'
const mapStateToProps=(state)=>{
    return {
        counter:state.counter,
    }
}
const mapDispatchToProps=(dispatch)=>{
return{
  increment:()=>dispatch({type:'increment'}),
  decrement:()=>dispatch({type:'decrement'})

}
}
const  Counter=(props)=> {
    return (
      <div>
        Counter Value:{props.counter}
        <br />
        {/*  <button onClick={()=>props.dispatch({type:'increment'})}>+</button>*/}
        <button onClick={() => props.increment()}>+</button>
        <button onClick={() => props.decrement()}>-</button>
      </div>
    );
}

export default connect(mapStateToProps,mapDispatchToProps)(Counter)
