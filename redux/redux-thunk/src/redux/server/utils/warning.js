const warning=(message)=>{
    if(typeof console!=='undefined' && typeof console.error==='function'){
        console.log(message);
    }
    try{
        throw new Error(message)
    }
    catch(e){}
}
export default warning;