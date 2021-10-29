import React,{useEffect} from 'react'
import { useDispatch } from 'react-redux'
import {fetchPost} from './action'

function Post() {
   const dispatch=useDispatch()
    useEffect(()=>{
     dispatch(fetchPost())
    },[])

    return (
        <div>
            
        </div>
    )
}

export default Post
