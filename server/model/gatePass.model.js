const mongoose = require('mongoose')
const validator = require('validator')

//GATE-PASS Schema  :

const gatePassSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'visitor name is required'],
        trim:true,
        minlength:[3 , 'name must be 3 character']
    },
    phone:{
        type:String,
        required:[true,'visitor mobile number is required'],
        validate:{
            validator:function(value){
                return validator.isMobilePhone(value,'en-IN')
            },
            message:'Invalid mobile number'
        }

    },
    vechileNo:{
        type:String,
        trim:true,
        uppercase:true
    },
    purpose:{
        type:String,
        required:[true , 'visiting purpose is empty'],
        trim:true,
        enum:['Admission','Interview','Project Review','Meet Staff','Meet Student','Event','others']
    },
    visitorAddress:{
        type:String,
        required:[true,'visitors address is required'],
        trim:true
    },
    inPass:{
        type:Date,
        default:Date.now(),
        required:true
    },
    outPass:{
        type:Date,
        default:null,

    },
    status:{
        type:String,
        enaum:['alive','exist'],
        default:'alive',
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId, ref:'User'
    }
    
},{timestamps:true})

module.exports = mongoose.model('Visitor',gatePassSchema)