const express = require('express')
const dotenv = require('dotenv').config()
const colors = require('colors')
const connectDb = require('./config/db')
const gatePassRouter = require('./router/gatePass.router')
const userRouter = require('./router/user.router')
const cors = require('cors')

//MIDDLEWARES :
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors({
    origin:'http://localhost:5173',
    methods:'GET,POST,PUT,DELETE',
    credentials:true
}))

//DATABASE :
connectDb()

// API'S END POINT :
app.use('/api/gate-pass',gatePassRouter)
app.use('/api/user',userRouter)

//SERVER :
const port = process.env.PORT || 4444
app.listen(port,()=>{
    console.log(`server listening on the port http://localhost:${port}`.green)
})