const express = require('express')
const dotenv = require('dotenv').config()
const colors = require('colors')

//MIDDLEWARES :
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:false}))

//SERVER :
const port = process.env.PORT || 4444
app.listen(port,()=>{
    console.log(`server listening on the port http://localhost:${port}`.green)
})