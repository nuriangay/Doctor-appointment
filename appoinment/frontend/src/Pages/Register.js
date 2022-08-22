
import {Button, Form, Input } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux'
import axios from 'axios'
import toast from 'react-hot-toast'
import { hideLoading, showLoading } from '../redux/alertsSlice'
const Register = () => {

    const navigate=useNavigate()

    const {loading}=useSelector(state=>state.alerts)
  

    const dispatch=useDispatch()

   
    const registerHandler=async(values)=>{
        try {
                
            dispatch(showLoading())
            if(!values.name||!values.email||!values.password){
                toast('please include all fields')
            }
            const response=await axios.post('/users/register',values)
            dispatch(hideLoading())
            if(response.data.success){
                toast.success(response.data.msg)
                toast('Redirecting to login page...')

                setTimeout(()=>{
                    navigate('/login')

                },3000)
            
            }else{
                toast.error(response.data.error)

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
            <h1 className='card-title'>Please Register</h1>

            <Form onFinish={registerHandler}  layout='vertical'>
                <Form.Item label='Name' type='text' name='name'  >
                    <Input />
                </Form.Item>
                <Form.Item label='E-mail' type='email' name='email' >
                    <Input />
                </Form.Item>
                <Form.Item label='Password' type='password' name='password'  >
                    <Input />
                </Form.Item>
                <Button htmlType='submit'  className='primary-button my-2'>Register</Button>

                <Link to='/login' className='register-link'>Have an account? Login</Link>

            </Form>

               
            
        </div>
    </div>
    
    </>
  )
}

export default Register
