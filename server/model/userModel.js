const mongoose = require('mongoose')
const validator = require('validator')

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'name is required'],
        minlength:[3 ,'minimum 3 character required'],
        trim:true
    },
    email:{
        type:String,
        required:[true,'email is required'],
        trim:true,
        unique:true,
        lowercase:true,
        validate:{
            function (value) {
                return validator.isEmail(value)
            },
            message:'invalid email format'
        }

    },
    password:{
        type:String,
        required:[true,'password is required'],
        trim:true,
        validate:{
            function(value){
                return validator.isStrongPassword(value)
            },
            message:'password must be strong, password should be contains lowercase,uppercase,symbols & numbers'
        }
    }

},{timestamps:true})

module.exports = mongoose.model('User' ,userSchema)