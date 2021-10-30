import { kindOf } from "./utils/kindOf";

const bindActionCreator=(actionCreator,dispatch)=>{
    return function () {
        return dispatch(actionCreator.apply(this, arguments))
      }
}
const bindActionCreators=(actionCreators,dispatch)=>{
    if(typeof actionCreators==='function'){
        return bindActionCreator(actionCreators,dispatch)
    }
    if(typeof actionCreators!=='object'||actionCreators==='null'){
        throw new Error(
            `bindActionCreators expected an object or a function, but instead received: '${kindOf(
                actionCreators
              )}'. ` +
                `Did you write "import ActionCreators from" instead of "import * as ActionCreators from"?`
        )
    }
    const boundActionCreators={};
      for(const key in actionCreators){
          const actionCreator=actionCreators[key];
          if(typeof actionCreator==='function'){
              boundActionCreators[key]=bindActionCreator(actionCreator,dispatch)
          }
      }
    return boundActionCreators;
    
}
export default bindActionCreators;