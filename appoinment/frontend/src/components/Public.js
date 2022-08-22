import React from 'react'
import { Navigate } from 'react-router-dom'

const Public = (props) => {
    if(localStorage.getItem('token')){
        return <Navigate to='/'/>

    }else{
     return   props.children

    }
}

export default Public
