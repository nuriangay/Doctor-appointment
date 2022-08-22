import Layout from '../../components/Layout'
import {useState,useEffect} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import { Form,Row,Input,Col,TimePicker,Button } from 'antd'
import { hideLoading, showLoading } from '../../redux/alertsSlice'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import toast from 'react-hot-toast'


const Profile = () => {

   
    const dispatch=useDispatch()

    const {userId}=useParams()

    const [doctorData,setDoctorData]=useState({})


    const getProfile=async()=>{
        try {
            dispatch(showLoading())

            const response=await axios.get(`/users/get-doctor-info/${userId}`,{
                headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}
            })
            dispatch(hideLoading())
            if(response.data.success){
                setDoctorData(response.data.data)
                
            }else{
                toast.error(response.data.message)

            }
            
        } catch (error) {
            dispatch(hideLoading())
            toast.error('something went wrong')
            
        }

    }

    const updateProfile=async(values)=>{
        try {
            dispatch(showLoading())
            const response=await axios.put(`/users/update-doctor/${userId}`,{...values},{
                headers:{Authorization:`Bearer ${localStorage.getItem('token')} `}
            })
            dispatch(hideLoading())
            
            if(response.data.success){
                toast.success(response.data.msg)
            }else{
                toast.error(response.data.msg)
            }
        } catch (error) {
            dispatch(hideLoading())
            toast.error('someting  went wrong')
            
        }

    }
   

    useEffect(()=>{
        getProfile()

    },[])
  return (
    <Layout>
        <h className='page-title'>Profile</h>

        <Form layout='vertical' onFinish={updateProfile}>
            <Row gutter={20}>
              
                <Col span={8} xs={24} sm={24} lg={8}>
                    <Form.Item  label='First Name' name='firstName' >
                        <Input  placeholder={`${doctorData.firstName?doctorData.firstName:'first name'}`} />

                    </Form.Item>
                </Col>
                <Col span={8} xs={24} sm={24} lg={8}>
                    <Form.Item label='Last Name' name='lastName' >
                        <Input placeholder={`${doctorData.lastName?doctorData.lastName:'last name'}`} />

                    </Form.Item>
                </Col>
               
                <Col span={8} xs={24} sm={24} lg={8}>
                    <Form.Item label='Phone Number' name='phoneNumber' >
                        <Input placeholder={`${doctorData.phoneNumber?doctorData.phoneNumber:'phone number'}`} />

                    </Form.Item>
                </Col>
                <Col span={8} xs={24} sm={24} lg={8}>
                    <Form.Item label='Website' name='website' >
                        <Input placeholder={`${doctorData.website?doctorData.website:'website'}`} />

                    </Form.Item>
                </Col>
                <Col span={8} xs={24} sm={24} lg={8}>
                    <Form.Item label='Address' name='address'>
                        <Input placeholder={`${doctorData.address?doctorData.address:'address'}`} />

                    </Form.Item>
                </Col>
            </Row>
            <hr/>
            <h1 className='card-title'>Professional Information</h1>

            <Row gutter={20}>
              
              <Col span={8} xs={24} sm={24} lg={8}>
                  <Form.Item label='Specialization' name='specialization' >
                      <Input placeholder={`${doctorData.specialiation?doctorData.specialiation:'specialization'}`} />

                  </Form.Item>
              </Col>
              <Col span={8} xs={24} sm={24} lg={8}>
                  <Form.Item label='Experience' name='experience'>
                      <Input placeholder={`${doctorData.experience?doctorData.experience:'experience'}`} />

                  </Form.Item>
              </Col>
             
              <Col span={8} xs={24} sm={24} lg={8}>
                  <Form.Item label=' Fee Per Consultation' name='feePerConsultation' >
                      <Input placeholder={`${doctorData.feePerConsultation?doctorData.feePerConsultation:'fee per consultation'}`} />

                  </Form.Item>
              </Col>
             
              {/* <Col span={8} xs={24} sm={24} lg={8}>
                  <Form.Item label='Timings' name='timings' rules={[{required:true}]}>
                      <TimePicker.RangePicker/>


                  </Form.Item>
              </Col> */}

            
          </Row>
          <div className='d-flex justify-content-end '>
            <Button htmlType='submit' className='primary-button'>Submit</Button>
        </div>


        </Form>


    </Layout>
  )
}

export default Profile
