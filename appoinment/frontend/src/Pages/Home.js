import {useEffect,useState} from 'react'
import axios from 'axios'
import Layout from '../components/Layout'
import { useDispatch } from 'react-redux'
import toast from 'react-hot-toast'
import {showLoading,hideLoading} from '../redux/alertsSlice'
import Doctor from '../components/Doctor'
import {Row,Col} from 'antd'





const Home = () => {
    const dispatch=useDispatch()
  

    const [doctor,setDoctor]=useState([])

    const getData=async()=>{
        const token=localStorage.getItem('token') 
        
        try {
            dispatch(showLoading())
            const response=await axios.get('/users/doctors',{
                headers:{
                    
                    Authorization:"Bearer " + token,
                
                }

            })
            dispatch(hideLoading())
            if(response.data.success){
                setDoctor(response.data.data)

            }else{
                dispatch(hideLoading())
                toast.error(response.data.msg)
            }
       
            
        } catch (error) {
            toast.error('something went wrong')
            
        }
    }

    useEffect(()=>{
        getData()

    },[])
  return (
    <Layout>
        <Row gutter={20}>
       {doctor?.map((doctor)=>{
        return <Col key={doctor._id} span={8} xs={24} sm={24} lg={8}>
            <Doctor  doctor={doctor}/>
        </Col>
       })}
       </Row>
    </Layout>
  )
}

export default Home
