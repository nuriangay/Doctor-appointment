import {useEffect,useState} from 'react'
import Layout from '../components/Layout'
import { useParams } from 'react-router-dom'
import {useDispatch,useSelector } from 'react-redux'
import { showLoading,hideLoading } from '../redux/alertsSlice'
import toast from 'react-hot-toast'
import axios from 'axios'
import moment from 'moment'
import { DatePicker, TimePicker,Row,Col,Button } from 'antd'

const Booking = () => {

    const [isAvailable,setIsAvailable]=useState(false)
    const [date,setDate]=useState()
    const [timings,setTimings]=useState()
    const {user}=useSelector(state=>state.user)

    const dispatch=useDispatch()
    const {doctorId}=useParams()

    const [doctor,setDoctor]=useState({})

    const doctorProfile=async()=>{
        
    try {
   
        dispatch(showLoading())
        const response=await axios.get(`/users/get-doctor-info/${doctorId}`,{
            headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}
        })
        dispatch(hideLoading())
        if(response.data.success){
            setDoctor(response.data.data)
        }else{
            dispatch(hideLoading())
            toast.error(response.data.msg)
        }
        
    } catch (error) {
        toast.error('something went wrong',error)

        
    }

    }

    const bookNow=async()=>{
        setIsAvailable(false)
        try{
        dispatch(showLoading())
        const response=await axios.post(`/users/booking`,{doctorId:doctorId,userInfo:user,doctorInfo:doctor,userId:doctor.userId,date:date,timings:timings},{
            headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}
        })
        dispatch(hideLoading())
        if(response.data.success){
            toast.success(response.data.msg)
            
        }else{
            dispatch(hideLoading())
            toast.error(response.data.msg)
        }
        
     } catch (error) {
        dispatch(hideLoading())
            toast.error('something went wrong',error)
    
            
        }
          
    }  
    
    const checkAvailability=async()=>{

        try{
        dispatch(showLoading())
        const response=await axios.post(`/users/availability`,{doctorId:doctorId,date:date,timings:timings},{
            headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}
        })
        dispatch(hideLoading())
        if(response.data.success){
            toast.success(response.data.msg)
            setIsAvailable(true)
            
        }else{
            dispatch(hideLoading())
            toast.error(response.data.msg)
        }
        
     } catch (error) {
        dispatch(hideLoading())
            toast.error('something went wrong',error)
    
            
        }
          
    }  

        
    useEffect(()=>{
        doctorProfile()

    },[])

    


    

  return (
    <Layout>
      <div > <h1 className='page-title'>{doctor.firstName} {doctor.lastName}</h1>
      <hr/>
      <Row>
        <Col span={8} sm={24} xs={24} lg={8}>
        <h1 className='normal-text'><b>Timings:</b>{doctor.timings} </h1>

            <div className='d-flex flex-column'>

                <DatePicker format='DD-MM-YYYY' onChange={(value)=>{setIsAvailable(false); setDate(moment(value).format('DD-MM-YYYY'))}}/>
                <TimePicker format='HH:mm' className='mt-3' onChange={(value)=>{setIsAvailable(false); setTimings(moment(value).format('HH:mm'))
                                                                                                                
            }} />

                <Button className='primary-button full-width-button mt-3' type='primary' onClick={checkAvailability}>Check Availability</Button>

                {isAvailable&& <Button className='primary-button full-width-button mt-3' type='primary' onClick={bookNow}>Book now</Button>}
               
            </div>
        
        </Col>
      </Row>
    
      
      
      </div>
    </Layout>
  )
}

export default Booking
