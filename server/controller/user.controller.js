const User = require('../model/userModel')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
//Register method :
const register = async(req,res)=>{
    try {
        const {name,email,password} = req.body
        if(!name || !email || !password){
           return res.status(404).json({success:false,message:'All fields are required'})
        }
        const userExist = await User.findOne({email})
        if(userExist){
            return res.status(404).json({success:false, message:'user already exist'})
        }
        if(!validator.isEmail(email)){
            return res.status(404).json({success:false,message:'invalid email format'})
        }
        if(!validator.isStrongPassword(password,{
            minLength:8,
            minLowercase:2,
            minUppercase:2,
            minNumbers:2,
            minSymbols:2
        })){
            return res.status(404).json({success:false,message:'password must contain min 8 character, 2 uppercase,lowercase,symbols & numbers'})
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)
        const newUser = await User.create({name,email,password:hashedPassword})
        const token = genToken(newUser._id)
        res.status(200).json({success:true,message:'user registered successfully',newUser,token})
    } catch (error) {
        console.log(`Register Error: ${error.message}`.red.bold)
        res.status(404).json({success:false,message:error.message})
    }
}
//Login method :
const login = async(req,res)=>{
    try {
        const {email,password} = req.body
        if(!email || !password){
            res.status(404).json({success:false,message:'All fields are required'})
        }
        const user = await User.findOne({email})
        if(!user){
            res.status(404).json({success:false,message:'user not found'})
        }
        const isMatching = await bcrypt.compare(password,user.password)
        if(!isMatching){
            res.status(404).json({success:false,message:'invalid password'})
        }
        const token = genToken(user._id)
        res.status(200).json({success:true,message:'user loged-in successfully',user,token})
    } catch (error) {
        console.log(`Register Error: ${error.message}`.red.bold)
        res.status(404).json({success:false,message:error.message})
    }
}
//get method :
const getUser = async(req,res)=>{
    try {
        const getUser = await User.find(req.user)
        res.status(200).json({success:false,message:'user fetched ',getUser})
    } catch (error) {
        console.log(`Register Error: ${error.message}`)
        res.status(404).json({success:false,message:error.message})
    }
}

//Token :
const genToken = (id)=>jwt.sign({id},process.env.JWT_SECRET,{expiresIn:'7d'})
module.exports ={
    register,
    login,
    getUser
}