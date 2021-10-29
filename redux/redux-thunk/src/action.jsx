import axios from "axios"

export const fetchPost=()=>{
   return async (dispatch,getState)=>{
        const response= axios.get('http://localhost:7000/title');
        console.log(response);
    dispatch({
        type:"FETCH_POST",
        payload:response.data,
    })
   }
}