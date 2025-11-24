const jwt = require('jsonwebtoken')
const User = require('../model/userModel')

const protect = async(req,res,next)=>{
    try{
        const authHeader = req.headers.authorization
        if(!authHeader || !authHeader.startsWith('Bearer ')){
           return res.status(404).json({success:false,message:'Not Authorized token Missing'})
        }
        const token = authHeader.split(' ')[1]
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        req.user = await User.findById(decoded.id).select('-password')
        next()
    }catch(error){
        console.log(`Auth Error: ${error.message}`)
        res.status(401).json({success:false,message:'Token invalid or expired'})
    }
}

module.exports = protect