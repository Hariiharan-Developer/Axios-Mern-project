const mongoose = require('mongoose')

//Database connection :
const connectDb =async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log(`Database connected : ${mongoose.connection.name}`.cyan)
    } catch (error) {
        console.log(`Database Error: ${error.message}`.red.bold)
        
    }
}

module.exports = connectDb