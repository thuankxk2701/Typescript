declare global{
    interface SymbolConstructor{
        readonly observable:symbol;

    }
}
const $$observable =(()=>
    (typeof Symbol ==='function' && Symbol.observable) ||'@@observable'
)();
export default $$observable;