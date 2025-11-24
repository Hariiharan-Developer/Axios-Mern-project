const express =require('express')
const { getUser, login, register} = require('../controller/user.controller')
const protect = require('../middleware/protect')
const userRouter =express.Router()

userRouter.get('/getUser',protect,getUser)
userRouter.post('/login',login)
userRouter.post('/register',register)

module.exports = userRouter