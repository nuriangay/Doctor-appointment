import React from 'react'
import {useNavigate} from 'react-router-dom'
const Doctor = ({doctor}) => {

      const navigate=useNavigate()
  return (
    <div className='card p-2' onClick={()=>navigate(`/booking/${doctor.userId}`)}>
        <h1 className='card-title'>{doctor.firstName} {doctor.lastName}</h1>
        <hr/>

        <p className='card-text'>Phone Number:{doctor.phoneNumber}</p>
        <p className='card-text'>Address:{doctor.address}</p>
        <p className='card-text'>Pee per visit:{doctor.feePerConsultation}</p>
        <p className='card-text'>Timings:{doctor.timings[0]}-{doctor.timings[1]}</p>
      
    </div>
  )
}

export default Doctor
