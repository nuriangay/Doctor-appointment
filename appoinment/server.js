const express=require('express')
const app=express()
const dotenv=require('dotenv')
const connect=require('./config/db')
app.use(express.json())

const userRoutes=require('./mrc/routes/user.route')


dotenv.config()



app.use('/users',userRoutes)


const port=process.env.PORT || 5000

app.listen(port,console.log(`server started at ${port}`))