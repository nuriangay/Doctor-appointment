const mongoose=require('mongoose')

mongoose.connect('mongodb+srv://nuriangay:06nuriangay@doctor.chtbvol.mongodb.net/booking')

const connection=mongoose.connection

connection.on('connected',()=> {console.log('database connected')})

connection.on('error',(error)=>{console.log(`error in the connection`)})


module.exports=mongoose