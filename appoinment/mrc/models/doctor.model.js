const mongoose=require('mongoose')

const doctorSchema=new mongoose.Schema({
    userId:{type:String,required:true},

    firstName:{type:String,required:true},
    lastName:{type:String,required:true},
    phoneNumber:{type:String,required:true},
    website:{type:String},
    address:{type:String,required:true},
    specialization:{type:String,required:true},
    experience:{type:String,required:true},
    feePerConsultation:{type:String,required:true},
    consultationHours:{type:Object},
    timings:{type:Array,required:true},
    status:{type:String,default:'pending'}



},{timestamps:{required:true}})

const doctorModel=mongoose.model('doctors',doctorSchema)
module.exports=doctorModel