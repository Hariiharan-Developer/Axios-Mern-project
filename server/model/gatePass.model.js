const mongoose = require('mongoose')
const validator = require('validatore')

//GATE-PASS Schema  :

const gatePassSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'visitor name is required'],
        trim:true,
        minlength:[3 , 'name must be 3 character']
    },
    phone:{
        type:Number,
        required:[true,'visitor mobile number is required'],
        validate:{
            validator:function(value){
                return validator.isMobilPhone(value,'en-IN')
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
    visitorAddres:{
        type:String,
        required:[true,'visitors address is required'],
        trim:true
    }
    
},{timestamps:true})

module.exports = mongoose.model('Visitor',gatePassSchema)