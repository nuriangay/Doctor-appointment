import {useEffect} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import { Navigate,useNavigate } from 'react-router-dom'
import { hideLoading, showLoading } from '../redux/alertsSlice'
import { setUser} from '../redux/usersSlice'
import axios from 'axios'


const Protected = (props) => {

    const {user}=useSelector(state=>state.user)
    const navigate=useNavigate()

    const dispatch=useDispatch()


    const getUser=async()=>{

        try {
            dispatch(showLoading())
            const response=await axios.post('/users/infos',{
                token:localStorage.getItem('token')
            },{headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}})

            dispatch(hideLoading())
            
            if(response.data.success){
                dispatch(setUser(response.data.data))
              


            }else{
                navigate('/login')
                localStorage.removeItem('token')
            }

         


            
        } catch (error) {
            dispatch(hideLoading())
            localStorage.removeItem('token')
            navigate('/login')
            
        }


    }

    useEffect(() => {

  
             getUser()
   
       
        


       
    }, [])

    if(localStorage.getItem('token')){
        return props.children

    }else{
     return   <Navigate to='/login' />

    }
 
}

export default Protected
