function miniKindOf(val){
    if(val=== void 0)return 'undefined';
    if(val===null) return 'null';
     const type = typeof val;
     switch(type){
         case 'number':
         case 'string':
         case 'boolean':
         case 'symbol':
         case 'function':{
             return type
         }
      default:break
     }
 
     if (Array.isArray(val)) return 'array'
     if (isDate(val)) return 'date'
     if(isError(val)) return 'error'

     const constructorName=ctorName(val)
     switch(constructorName){
         case 'Symbol':
          case 'Promise':
            case 'WeakMap':
            case 'WeakSet':
            case 'Map':
            case  'Set': return constructorName
                

        default:
            break;
     }
     //TYPE OTHER
     return type.slice(8,-1).toLowerCase().replace(/\s/g,'');

}

function isDate(val) {
    if (val instanceof Date) return true
    return (
      typeof val.toDateString === 'function' &&
      typeof val.getDate === 'function' &&
      typeof val.setDate === 'function'
    )
  }
function isError(val) {
    return (
      val instanceof Error ||
      (typeof val.message === 'string' &&
        val.constructor &&
        typeof val.constructor.stackTraceLimit === 'number')
    )
  }
function ctorName(val) {
    return typeof val.constructor === 'function' ? val.constructor.name : null
  }
export function kindOf(val) {
    let typeOfVal = typeof val
  
    if (process.env.NODE_ENV !== 'production') {
      typeOfVal = miniKindOf(val)
    }
  
    return typeOfVal
  }
  
  