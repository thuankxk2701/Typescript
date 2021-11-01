
import { Action, AnyAction } from './actions'
import { Reducer } from './reducers'
import '../utils/symbol-observable'

export type ExtendState<State, Extension> = [Extension] extends [never]
  ? State
  : State & Extension

declare const $CombinedState:unique symbol;

interface EmptyObject {
    readonly [$CombinedState]?: undefined
  }
  export type CombinedState<S> = EmptyObject & S

export type PreloadedState<S>=Required<S>  extends EmptyObject ?
   S extends CombinedState<infer S1>
     ?{
          [K in keyof S1] ?:S1[K] extends object ?PreloadedState<S1[K]>:S1[K];
     } :S
     :{
         [K in keyof S]:S[K] extends number|string|boolean|symbol?S[K]:
         PreloadedState<S[K]>
     }

export interface Dispatch<A extends Action = AnyAction> {
  <T extends A>(action: T, ...extraArgs: any[]): T
}

export interface Unsubscribe{
    ():void;
}

declare global {
    interface SymbolConstructor {
      readonly observable: symbol
    }
  }

  export type Observable<T> = {
    subscribe:(observer:Observer<T>)=>{
        unsubscribe:Unsubscribe
    }
    [Symbol.observable]():Observable<T>
}

export type Observer<T> = {
    next?(value: T): void
  }

export interface Store<S=any,
A extends Action=AnyAction,
StateExt=never,
Ext={}>{
    dispatch: Dispatch<A>;

    getState(): S;
    subscribe(listener: () => void): Unsubscribe

    replaceReducer<NewState,NewActions extends Action>(
        nextReducer:Reducer<NewState,NewActions>
    ):Store<ExtendState<NewState,StateExt>,NewActions,StateExt,Ext> & Ext;

   [Symbol.observable]():Observable<S>
}

export interface StoreCreator {
    <S, A extends Action, Ext = {}, StateExt = never>(
      reducer: Reducer<S, A>,
      enhancer?: StoreEnhancer<Ext, StateExt>
    ): Store<ExtendState<S, StateExt>, A, StateExt, Ext> & Ext
    <S, A extends Action, Ext = {}, StateExt = never>(
      reducer: Reducer<S, A>,
      preloadedState?: PreloadedState<S>,
      enhancer?: StoreEnhancer<Ext>
    ): Store<ExtendState<S, StateExt>, A, StateExt, Ext> & Ext
  }

  export type StoreEnhancer<Ext = {}, StateExt = never> = (
    next: StoreEnhancerStoreCreator<Ext, StateExt>
  ) => StoreEnhancerStoreCreator<Ext, StateExt>

export type StoreEnhancerStoreCreator<Ext={},StateExt=never >= <S =any,
A extends Action=AnyAction>(
    reducer:Reducer<S,A>,
    preloadedState?: PreloadedState<S>)=>Store<ExtendState<S,StateExt>,A,StateExt,Ext> &Ext;