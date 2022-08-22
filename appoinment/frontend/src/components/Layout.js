import {useState} from 'react'
import '../layout.css'
import { Badge } from 'antd'
import { Link,useLocation,useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'


const Layout = ({children}) => {
    const location=useLocation()

    

    const {user}=useSelector(state=>state.user)
    
    const navigate=useNavigate()
    

    const [collapsed,setCollapsed]=useState(false)

    const userMenu=[
        {id:1,name:'Home',path:'/',icon:'ri-home-line'},
        {id:2,name:'Appointments',path:'/appointments',icon:'ri-file-list-line'},
        {id:3,name:'Apply Doctor',path:'/apply-doctor',icon:'ri-hospital-line'},
        {id:4,name:'Profile',path:`/profile/${user.id}`,icon:'ri-user-line'},
  
    ]

    const adminMenu=[
        {id:1,name:'Home',path:'/',icon:'ri-home-line'},
        {id:2,name:'Users',path:'/users',icon:'ri-user-line'},
        {id:4,name:'Doctors',path:'/doctors',icon:'ri-hospital-line'},
        {id:5,name:'Profile',path:'/profile',icon:'ri-profile-line'},
      
    ]

   
    const renderMenu=user.isAdmin ? adminMenu : userMenu

    const logoutHandler=()=>{
        localStorage.removeItem('token')
        navigate('/login')
    }

  return (
    <div className='main p-2'>
        <div className='d-flex layout'>

            <div className='sidebar'>
                <div className='sidebar-header'>
                    <h1>HEALTY {user.isAdmin&&'admin page'}</h1>
                </div>
                <div className='menu'>
                    {renderMenu.map((menu)=>{
                        const isActive=location.pathname===menu.path
                        return <div key={menu.id} className={`d-flex menu-item ${isActive&&'active-menu-item'}`}>
                            <i  className={menu.icon}></i>
                           {!collapsed&&<Link to={menu.path}>{menu.name}</Link>} 
                          
                        </div>
                    })}
                    <div className={`d-flex menu-item`} onClick={logoutHandler}>
                            <i  className='ri-logout-line'></i>
                           {!collapsed&&<Link to={'/login'}>Logout</Link>} 
                          
                        </div>
                </div>


                </div>
                <div className='content'>
                    <div className='header'>
                    {collapsed ? <i className='ri-menu-2-fill remix-icon' onClick={()=>setCollapsed(!collapsed)}></i>: <i className='ri-close-fill remix-icon' onClick={()=>setCollapsed(!collapsed)}></i>} 

                    <div className='d-flex align-items-center px-2'><Link to='/profile' className='anchor'>{user.name}</Link>
                    
                    <Badge onClick={()=>navigate('/notifications')} count={user.unseenNotifications?.length}>
                    <i className='ri-notification-line remix-icon' ></i>
                       
                    </Badge>
                    </div>
                    </div>
                    <div className='body'>

                        {children}
                    </div>


                </div>
         
        </div>
    </div>
  )
}

export default Layout
