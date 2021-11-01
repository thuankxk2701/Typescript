export interface Action<T=any>{
    type:T;
}
export interface AnyAction extends Action{
    [extraProps:string]:any
}

export interface ActionCreator<A,P extends any[]=any[]>{
    (...args:P):A
}
export interface ActionCreatesMapObject<A=any,P extends any[]=any[]>{
 [key:string]:ActionCreator<A,P>
}