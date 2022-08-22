import {useState,useEffect} from 'react'
import Layout from '../components/Layout'
import { useSelector,useDispatch } from 'react-redux'
import { showLoading,hideLoading } from '../redux/alertsSlice'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Table } from 'antd'

const UserAppoinments = () => {
    const columns=[
        {title:'Id', dataIndex:'_id'},
        {title:'Doctor',dataIndex:'name',
        render:(text,record)=><p className='card-text'>{record.doctorInfo.firstName} {record.doctorInfo.lastName}</p>
    
      
      
      },
        {title:'Phone Number',dataIndex:'address',
        render:(text,record)=><span className='card-text'>{record.doctorInfo.phoneNumber} </span>
    },

        {title:'Address',dataIndex:'phoneNumber',
    
        render:(text,record)=><span className='card-text'>{record.doctorInfo.address}</span>
    },
        {title:'Date & Time',dataIndex:'createdAt',
        render:(text,record)=><span className='card-text'>{record.date} - {record.timings}</span>
    
    },
        {title:'Status',dataIndex:'status'},
        
    ]

    const dispatch=useDispatch()
    const [appointments,setAppointments]=useState([])


    const userAppointments=async()=>{

       
        try {
            dispatch(showLoading())

            const response=await axios.get('/users/user-appointments',{
                headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}
            })
            dispatch(hideLoading())
            if(response.data.success){
                setAppointments(response.data.data)
            }
            else{
                toast.error(response.data.msg)
            }
        } catch (error) {
            dispatch(hideLoading())
            toast.error('something went wrong')
            
        }

    }

    useEffect(()=>{
        userAppointments()

    },[])
  return (
    <Layout>
         <h1 className='page-header'>Bookings List</h1>
      <Table columns={columns} dataSource={appointments}/>
      
    </Layout>
  )
}

export default UserAppoinments
