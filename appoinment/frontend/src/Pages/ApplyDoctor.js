import { Form,Row,Input,Col,TimePicker,Button } from 'antd'
import React from 'react'
import Layout from '../components/Layout'
import {useDispatch,useSelector} from 'react-redux'
import { hideLoading, showLoading } from '../redux/alertsSlice'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const ApplyDoctor = () => {

    const dispatch=useDispatch()

    const navigate=useNavigate()

    const {user}=useSelector(state=>state.user)

    const onFinish=async(values)=>{
        try {

            dispatch(showLoading())
            const response=await axios.post('/users/apply-doctor',{...values,userId:user._id},{
                headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}

            })
            dispatch(hideLoading())
            if(response.data.success){
                toast.success('Doctor account created successfully')
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
    <Layout>
        <h1 className='page-title'>Apply Doctor</h1>
        <h1 className='card-title mt-3'>Personal Information</h1>
        <Form onFinish={onFinish} layout='vertical'>
            <Row gutter={20}>
              
                <Col span={8} xs={24} sm={24} lg={8}>
                    <Form.Item label='First Name' name='firstName' rules={[{required:true}]}>
                        <Input placeholder='First name' />

                    </Form.Item>
                </Col>
                <Col span={8} xs={24} sm={24} lg={8}>
                    <Form.Item label='Last Name' name='lastName' rules={[{required:true}]}>
                        <Input placeholder='Last name' />

                    </Form.Item>
                </Col>
               
                <Col span={8} xs={24} sm={24} lg={8}>
                    <Form.Item label='Phone Number' name='phoneNumber' rules={[{required:true}]}>
                        <Input placeholder='First name' />

                    </Form.Item>
                </Col>
                <Col span={8} xs={24} sm={24} lg={8}>
                    <Form.Item label='Website' name='website' >
                        <Input placeholder='Website' />

                    </Form.Item>
                </Col>
                <Col span={8} xs={24} sm={24} lg={8}>
                    <Form.Item label='Address' name='address' rules={[{required:true}]}>
                        <Input placeholder='Address' />

                    </Form.Item>
                </Col>
            </Row>
            <hr/>
            <h1 className='card-title'>Professional Information</h1>

            <Row gutter={20}>
              
              <Col span={8} xs={24} sm={24} lg={8}>
                  <Form.Item label='Specialization' name='specialization' rules={[{required:true}]}>
                      <Input placeholder='Specialization' />

                  </Form.Item>
              </Col>
              <Col span={8} xs={24} sm={24} lg={8}>
                  <Form.Item label='Experience' name='experience' rules={[{required:true}]}>
                      <Input placeholder='Experience' />

                  </Form.Item>
              </Col>
             
              <Col span={8} xs={24} sm={24} lg={8}>
                  <Form.Item label=' Fee Per Consultation' name='feePerConsultation' rules={[{required:true}]}>
                      <Input placeholder=' Fee Per Consultation' />

                  </Form.Item>
              </Col>
             
              <Col span={8} xs={24} sm={24} lg={8}>
                  <Form.Item label='Timings' name='timings' rules={[{required:true}]}>
                      <TimePicker.RangePicker/>


                  </Form.Item>
              </Col>

            
          </Row>
          <div className='d-flex justify-content-end '>
            <Button htmlType='submit' className='primary-button'>Submit</Button>
        </div>


        </Form>
       
    </Layout>

  )
}

export default ApplyDoctor
