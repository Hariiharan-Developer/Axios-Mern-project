const express = require('express')
const dotenv = require('dotenv').config()
const colors = require('colors')
const connectDb = require('./config/db')
const gatePassRouter = require('./router/gatePass.router')

//MIDDLEWARES :
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))

//DATABASE :
connectDb()

// API'S END POINT :
app.use('/api/gate-pass',gatePassRouter)

//SERVER :
const port = process.env.PORT || 4444
app.listen(port,()=>{
    console.log(`server listening on the port http://localhost:${port}`.green)
})