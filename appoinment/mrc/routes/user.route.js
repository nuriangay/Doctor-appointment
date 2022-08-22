const express=require('express')
const router=express.Router()
const User=require('../models/user.model')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const moment=require('moment')
const { protect } = require('../../middleware/auth')
const Doctor=require('../models/doctor.model')
const Booking=require('../models/booking.model')

router.post('/register',async(req,res)=>{
    try {  
        const {name,email,password}=req.body

        const userExist=await User.findOne({email:req.body.email})

        if(userExist){
            res.status(400).send({msg:'user already exist',success:false})

        }
      

        

        const salt=await bcrypt.genSalt(10)

        const hashedPassword=await bcrypt.hash(password,salt)

        const newUser=new User({
            name:name,
            email:email,
            password:hashedPassword
        })

        

        await newUser.save()

        res.status(201).json({msg:'User created successfully',success:true})




        
    } catch (error) {
        res.status(500).send({msg:'Error in create user',success:false,error})
        
    }


})

router.post('/login',async(req,res)=>{
    try {

        const {email,password}=req.body

        const user=await User.findOne({email:req.body.email})

        if(!user){
          return  res.status(200).send({msg:'User does not exist',success:false})

        }

        const match=await bcrypt.compare(req.body.password,user.password)


        if(!match){
          return  res.status(200).send({msg:'Password is incorrect',success:false})

        }else{
            const token=jwt.sign({userId:user._id},process.env.SECRET,{expiresIn:'30d'})
            res.status(200).send({msg:'Login successful',success:true,data:token,name:user.name})


       
        }
       

    } catch (error) {
        res.status(500).send({msg:'Something went wrong',error,success:false})
        
    }


})


router.post('/infos',protect,async(req,res)=>{
    try {
        const user=await User.findOne({_id:req.body.userId})
       
       
        if(!user){
            res.status(200).send({msg:'User not found',success:false})
        }else{
            res.status(200).send({data:{id:user._id,name:user.name,email:user.email,isAdmin:user.isAdmin,isDoctor:user.isDoctor,seenNotifications:user.seenNotifications,unseenNotifications:user.unseenNotifications},success:true})
        }
        
    } catch (error) {
        res.status(500).send({msg:'Error getting information',success:false})
        
    }

})
router.post('/apply-doctor',protect,async(req,res)=>{
    try {
        const newDoctor=new Doctor({...req.body,status:'pending'})

        await newDoctor.save()


        const adminUser=await User.findOne({isAdmin:true});
        const unseenNotifications=adminUser.unseenNotifications

        unseenNotifications.push({
            type:'new doctor-request',
            message:`${newDoctor.firstName +' '+newDoctor.lastName} applied for doctor account`,
            data:{doctorId:newDoctor._id,name:newDoctor.firstName + ' ' + newDoctor.lastName},
            onClickPath:'/admin/doctors'
        })
   

        

        res.status(200).send({success:true,msg:'Account created successfully',isDoctor:doctorUser.isDoctor})
        await User.findByIdAndUpdate(adminUser._id,{unseenNotifications})


        
    } catch (error) {
        console.log(error)
        res.status(500).send({msg:'error applying doctor account',success:false,error})
        
    }

})

router.post('/mark-as-seen',protect,async(req,res)=>{
    try {
        const user=await User.findOne({_id:req.body.userId})

        const unSeenNotifications=user.unseenNotifications

        user.seenNotifications=unSeenNotifications
        user.unseenNotifications=[]

        const updatedUser=await User.findByIdAndUpdate(user._id,user)

        updatedUser.password=undefined

        res.status(200).send({success:true,message:'All notifications marked as seen',data:updatedUser})
        
    } catch (error) {
        console.log(error)
        res.status(500).send({msg:'error in mark as seen',success:false,error})
        
    }


})
router.post('/delete-all-notifications',protect,async(req,res)=>{
    try {
        const user=await User.findOne({_id:req.body.userId});

        user.seenNotifications=[]
        user.unseenNotifications=[]
        const updatedUser=await User.findByIdAndUpdate(user._id,user)
        updatedUser.password=undefined
    
        res.status(200).send({success:true,message:'Notifications are deleted',data:updatedUser})
        
    } catch (error) {
        console.log(error)
        res.status(500).send({msg:'error in delete notifications',success:false,error})
        
    }
 
    

})
router.get('/allUsers',protect,async(req,res)=>{
    const users=await User.find({})

    res.status(200).send({success:true,message:'users fetched successfully',data:users})

})
router.get('/doctors',protect,async(req,res)=>{
    const doctors=await Doctor.find({})

    res.status(200).send({success:true,message:'doctors fetched',data:doctors})

})
router.get('/get-doctor-info/:id',protect,async(req,res)=>{
    const doctor=await Doctor.findOne({userId:req.params.id})

    if(doctor){
        res.status(200).send({success:true,msg:'doctor data fetched',data:doctor})
    }else{
        res.status(200).send({success:false,msg:'no doctor profile found for this user'})
    }
    
})
router.put('/update-doctor/:id',protect,async(req,res)=>{
    try {
        const doctor =await Doctor.findOneAndUpdate({userId:req.body.userId},req.body)

        res.status(200).send({success:true,msg:'data updated successfully',data:doctor})
        
    } catch (error) {
        res.status(200).send({success:false,msg:'error in update profile'})
        
    }
  

   

})
router.post('/booking',protect,async(req,res)=>{

    try {
        req.body.status='pending'
        req.body.date=moment(req.body.date,'DD-MM-YYYY').toISOString()
        req.body.timings=moment(req.body.timings,'HH:mm').toISOString()
        const booking =  new Booking(req.body)

        await booking.save()

      const  userDoctor=await User.findOne({_id:req.body.doctorInfo.userId})

      userDoctor.unseenNotifications.push({
        type:'New booking request',message:`${req.body.userInfo.name} has a new booking request`,onClickPath: '/doctor/bookings'
      })

      await userDoctor.save()

      res.status(200).send({success:true,msg:'Booked successfully'})



    } catch (error) {
        res.status(500).send({success:false,msg:'Error in booking ',error})
        
    }

    

})

router.post('/availability',protect,async(req,res)=>{

    try {
      
        const date=moment(req.body.date,'DD-MM-YYYY').toISOString()
        const fromTime=moment(req.body.timings,'HH:mm').subtract(1,'hours').toISOString()
        const toTime=moment(req.body.timings,'HH:mm').add(1,'hours').toISOString()

        const doctorId=req.body.doctorId
        const bookings=await Booking.find({
            doctorId,
            date,
            timings:{$gte:fromTime,$lte:toTime},
           
        })

        if(bookings.length >0){
            return res.status(200).send({success:false,msg:'Appointment not available'})
        }else{
            return res.status(200).send({success:true,msg:'Appointment available'})

        }


    } catch (error) {
        res.status(500).send({success:false,msg:'Error in checking availability ',error})
        
    }

    

})

router.get('/user-appointments',protect,async(req,res)=>{

    try {
        const userAppointments=await Booking.find({userId:req.body.userId})

        res.status(200).send({success:true,msg:'data fetched',data:userAppointments,length:userAppointments.length})
    } catch (error) {

        res.status(200).send({success:false,msg:'Error in data fetch',error})
        
    }

    

})

module.exports=router