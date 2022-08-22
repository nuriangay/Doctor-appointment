import React from 'react'
import Layout from '../components/Layout'
import { Tabs } from 'antd'
import { useSelector,useDispatch } from 'react-redux'
import {useNavigate } from 'react-router-dom'
import { showLoading,hideLoading } from '../redux/alertsSlice'
import toast from 'react-hot-toast'
import { setUser } from '../redux/usersSlice'
import axios from 'axios'

const Notifications = () => {

    const dispatch=useDispatch()
    const navigate=useNavigate()

    const {user}=useSelector(state=>state.user)

    const markAllAsSeen=async()=>{
        try {
         

            const response=await axios.post('/users/mark-as-seen',{userId:user._id},{
                headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}
            })
           
            if(response.data.success){
                toast.success(response.data.message)
                dispatch(setUser(response.data.data))
    
            }else{
                toast.error(response.data.message)
    
            }
            
        } catch (error) {
            dispatch(hideLoading())
            toast.error('Something went wrong')
            
        }
      

    }

    const deleteNotifications=async()=>{
        try {
            dispatch(showLoading())
            const response=await axios.post('/users/delete-all-notifications',{userId:user._id},{
                headers:{Authorization:`Bearer ${localStorage.getItem('token')} ` }
            })
            dispatch(hideLoading())
            if(response.data.success){
                toast.success(response.data.message)
                dispatch(setUser(response.data.data))
            }else{
                toast.error(response.data.message)
                
            }

            
        } catch (error) {
            dispatch(hideLoading())
            toast.error('Something went wrong')
            
            
        }
    }

    

  return (
   <Layout>
    <h1 className='page-title'>Notifications</h1>
    <Tabs>
        <Tabs.TabPane tab='Unseen' key={0}>
           <div className='d-flex justify-content-end'>
            <div className='anchor' onClick={markAllAsSeen}>Mark all as seen </div>
           </div>
           {user.unseenNotifications?.map((item)=>{
            return <div key={item._id} className='card p-2' onClick={()=>navigate(item.onClickPath)}>
                <div className='card-text'>{item.message}</div>
            </div>
           })}

        </Tabs.TabPane>
        <Tabs.TabPane tab='Seen' key={1}>
        <div className='d-flex justify-content-end'>
            <div className='anchor' onClick={deleteNotifications}>Delete All</div>
   
           </div>
           {user.seenNotifications?.map((item)=>{
                return <div className='card p-2' key={item._id}>
                    <div className='card-text'>{item.message}</div>
                </div>
            })}
           

        </Tabs.TabPane>
    </Tabs>
   </Layout>
  )
}

export default Notifications
