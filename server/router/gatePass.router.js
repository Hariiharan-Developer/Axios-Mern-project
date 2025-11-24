const express = require('express')
const { getGatePass, createGatePass, updateGatePass, deleteGatePass,getSingleGatePass } = require('../controller/gatePass.controller')
const protect = require('../middleware/protect')
const gatePassRouter = express.Router()

gatePassRouter.get('/',protect,getGatePass)
gatePassRouter.get('/get-single',protect,getSingleGatePass)
gatePassRouter.post('/',protect,createGatePass)
gatePassRouter.put('/:id',protect,updateGatePass)
gatePassRouter.delete('/:id',protect,deleteGatePass)

module.exports = gatePassRouter
