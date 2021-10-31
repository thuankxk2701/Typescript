const randomToString =()=>{
    Math.random().toString(36).substring(7).split('').join('.')

}
console.log("Test5");
const ActionTypes ={
    INIT:`@@redux/INIT${randomToString}`,
    REPLACE:`@@redux/REPLACE${randomToString}`,
    PROBE_UNKNOWN_ACTION:()=>`@@redux/PROBE_UNKNOWN_ACTION${randomToString}`
}
export default ActionTypes;