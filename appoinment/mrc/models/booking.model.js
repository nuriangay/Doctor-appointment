const mongoose=require('mongoose')


const bookingSchema=new mongoose.Schema({

    userId:{type:String,required:true},
    doctorId:{type:String,required:true},
    doctorInfo:{type:Object,required:true},
    userInfo:{type:Object,required:true},
    date:{type:String,required:true},
    timings:{type:String,required:true},
    status:{type:String,required:true,default:'pending'}

},
{timestamps:true})

const bookingModel=new mongoose.model('bookings',bookingSchema)
module.exports = bookingModel