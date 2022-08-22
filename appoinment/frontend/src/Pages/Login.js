import React from 'react'
import {Button, Form, Input } from 'antd'
import { Link,useNavigate } from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux'
import toast from 'react-hot-toast'
import axios from 'axios'
import { hideLoading, showLoading } from '../redux/alertsSlice'


const Login = () => {
    const {loading}=useSelector(state=>state.alerts)
  

    const dispatch=useDispatch()
    const navigate=useNavigate()

   
    const loginHandler=async(values)=>{
        try {
            dispatch(showLoading())

            if(!values.email||!values.password){
                toast('please include all fields')
            }
            const response=await axios.post('/users/login',values)
            dispatch(hideLoading())
            if(response.data.success){
                toast.success(response.data.msg)
                toast('Redirecting to home page...')
                localStorage.setItem('token',response.data.data)

             
                    navigate('/')

              
            
            }else{
                toast.error(response.data.msg)

            }
            
        } catch (error) {
            dispatch(hideLoading())
            toast.error('something went wrong')
            
        }


    }
  return (
    <>
    <div className='authentication'>

        <div className='register-form card p-2'>
            <h1 className='card-title'>Please Login</h1>

            <Form onFinish={loginHandler} layout='vertical'>
               
                <Form.Item label='E-mail' name='email' >
                    <Input />
                </Form.Item>
                <Form.Item label='Password'  type='password' name='password' >
                    <Input />
                </Form.Item>
                <Button htmlType='submit' className='primary-button my-2'>Login</Button>

                <Link to='/register' className='register-link'> Don't have an account? Register</Link>

            </Form>

               
            
        </div>
    </div>
    
    </>
  )
}

export default Login
