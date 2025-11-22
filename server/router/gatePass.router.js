const express = require('express')
const { getGatePass, createGatePass, updateGatePass, deleteGatePass,getSingleGatePass } = require('../controller/gatePass.controller')
const gatePassRouter = express.Router()

gatePassRouter.get('/',getGatePass)
gatePassRouter.get('/get-single',getSingleGatePass)
gatePassRouter.post('/',createGatePass)
gatePassRouter.put('/:id',updateGatePass)
gatePassRouter.delete('/:id',deleteGatePass)

module.exports = gatePassRouter
