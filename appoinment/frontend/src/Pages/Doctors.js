import {useState,useEffect} from 'react'
import Layout from '../components/Layout'
import { useSelector,useDispatch } from 'react-redux'
import { showLoading,hideLoading } from '../redux/alertsSlice'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Table } from 'antd'
const Doctors = () => {
  const dispatch=useDispatch()

  const [doctors,setDoctors]=useState([])

  const doctorsList=async()=>{

    try {
      dispatch(showLoading())
      const response=await axios.get('/users/doctors',{
        headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}
      })
     dispatch(hideLoading()) 
      if(response.data.success){
        setDoctors(response.data.data)
        
  
      }else{
        toast.error(response.data.message)
      }
  
      
    } catch (error) {
      dispatch(hideLoading())
      toast.error('error in fetch users list',error)
      
    }
   
  }


  useEffect(()=>{
    doctorsList()

  },[])

  const columns=[
    {title:'Name',dataIndex:'name',
    render:(text,record)=><h4 className='card-text'>{record.firstName} {record.lastName}</h4>

  
  
  },
    {title:'Address',dataIndex:'address'},
    {title:'Phone',dataIndex:'phoneNumber'},
    {title:'Created At',dataIndex:'createdAt'},
    {title:'Status',dataIndex:'status'},
    {title:'Actions',dataIndex:'actions' ,render:(text,record)=>{
        <div className='d-flex'>
            {record.status==='pending' && <h1>Approve</h1>}
            {record.status==='approved' && <h1>Block</h1>}
        </div>
    }}
]

  return (
    <Layout>
      <h1 className='page-header'>Doctors List</h1>
      <Table columns={columns} dataSource={doctors}/>
    </Layout>
  )
}

export default Doctors
