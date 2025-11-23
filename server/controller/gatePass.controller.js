const Visitor = require('../model/gatePass.model')
// 1.GET METHOD :
const getGatePass = async(req,res)=>{
    try {
        const visitor = await Visitor.find()
        return res.status(202).json({success:true,message:visitor})
    } catch (error) {
        return res.status(404).json({success:false,message:error.message})
        console.log(`GET : ${error.message}`)
    }
}
// 1.GET SINGLE METHOD :
const getSingleGatePass = async(req,res)=>{
    try {
        const {id} =req.body
        const {phone} =req.body
        if(!phone){
            return res.status(404).json({success:false,message:'mobile number is required'})
        }
        const findVisitor = await Visitor.find({phone})
        if(!findVisitor){
            return res.status(404).json({success:false,message:'visitor not found'})
        }
        return res.status(202).json({success:true,message:findVisitor})
    } catch (error) {
        return res.status(404).json({success:false,message:error.message})
        console.log(`GET : ${error.message}`)
    }
}
// 2.CREATE METHOD :
const createGatePass = async(req,res)=>{
    try {
        const {name,vechileNo,phone,purpose,visitorAddress} =req.body
        if(!name  || !phone || !purpose || !visitorAddress){
            return res.status(404).json({success:false,message:'All fields are required'})
        }
        const createVisitor = await Visitor.create({name,phone,vechileNo,purpose,visitorAddress})
        return res.status(202).json({success:true,message:'Gate-pass created',createVisitor})
    } catch (error) {
        return res.status(404).json({success:false,message:error.message})
        console.log(`GET : ${error.message}`)
    }
}
// 3.UPDATE METHOD :
const updateGatePass = async(req,res)=>{
    try {
        const {id} =req.params
        const {name,phone} = req.body
        if(!name || !phone){
            return res.status(404).json({success:false,message:'name & phon-no is required'})
        }
        const updatedvisitor = await Visitor.findByIdAndUpdate(id,{name,phone},{new:true})
        if(!updatedvisitor){
            return res.status(404).json({success:false,message:'invalid credantials'})
        }
        return res.status(202).json({success:true,message:'gate-pass updated',updatedvisitor})
    } catch (error) {
        return res.status(404).json({success:false,message:error.message})
        console.log(`GET : ${error.message}`)
    }
}
// 4.DELETE METHOD :
const deleteGatePass = async(req,res)=>{
    try {
        const {id} =req.params
        if(!id){
            return res.status(404).json({success:false,message:'id is required'})
        }
        const deleteVisitor = await Visitor.findByIdAndDelete(id)
        if(!deleteVisitor){
            return res.status(404).json({succes:false,message:'invalid credantial'})
        }
        return res.status(202).json({success:true,message:'gate-pass deleted'})
    } catch (error) {
        return res.status(404).json({success:false,message:error.message})
        console.log(`GET : ${error.message}`)
    }
}

module.exports = {
    getGatePass,
    getSingleGatePass,
    createGatePass,
    updateGatePass,
    deleteGatePass
}