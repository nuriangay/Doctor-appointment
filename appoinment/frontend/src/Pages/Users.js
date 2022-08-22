import {useState,useEffect}from 'react'
import Layout from '../components/Layout'
import axios from 'axios'
import {useDispatch} from 'react-redux'
import {showLoading,hideLoading} from '../redux/alertsSlice'
import toast from 'react-hot-toast'
import { Table } from 'antd'


const Users = () => {
    const [users,setUsers]=useState([])

    const dispatch=useDispatch()


    const getUsers=async()=>{
        try {
            dispatch(showLoading())
            const response=await axios.get('/users/allUsers',{
                headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}
            })
            dispatch(hideLoading())
            if(response.data.success){
                setUsers(response.data.data)
                
            }
            
            
        } catch (error) {
            dispatch(hideLoading())

            toast.error('error in fetch users list')
            
        }

    }

    useEffect(()=>{
        getUsers()
    },[])

    const columns=[
        {title:'Name',dataIndex:'name'},
        {title:'Email',dataIndex:'email'},
        {title:'İs Admin',dataIndex:'isAdmin'},
        {title:'Created At',dataIndex:'createdAt'},
        {title:'Actions',dataIndex:'actions' ,render:(text,record)=>{
            <div className='d-flex'>
                <h1 className='anchor'>Block</h1>
            </div>
        }}
    ]

  return (
  <Layout>
    <Table columns={columns} dataSource={users}/>
  </Layout>
  )
}

export default Users
