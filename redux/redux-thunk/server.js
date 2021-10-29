const express= require('express')
// import { express } from "express"

// import express  from "express"

const app = express()
const data={
  "sureName": "Nguyen",
    "foreName": "Thuan",
    "age": 18,
    "job": "developer"
}
 
app.get('/title', (req, res)=> {
  res.send(data)
})
 const port =7000;
app.listen(port, console.log(`listening http://localhost:${port}`))