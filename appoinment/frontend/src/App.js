import {BrowserRouter,Routes,Route} from 'react-router-dom'
import { Toaster } from 'react-hot-toast';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Home from './Pages/Home';
import { useSelector } from 'react-redux';
import Protected from './components/Protected';
import Public from './components/Public';
import ApplyDoctor from './Pages/ApplyDoctor';
import Notifications from './Pages/Notifications';
import Doctors from './Pages/Doctors';
import Users from './Pages/Users';
import Profile from './Pages/Doctor/Profile';
import Booking from './Pages/Booking'
import UserAppointments from './Pages/UserAppoinments';
function App() {
  const {loading} =useSelector(state=>state.alerts)
  return (
    <BrowserRouter>

    {loading&&(

<div className='spinner-parent'>
<div class="spinner-border" role="status">

</div>


</div>
    )}
 
    <Toaster position='top-center' reverseOrder={false}/>
    <Routes>

      <Route path='/login' element={<Public><Login/></Public>} />
      <Route path='/register' element={<Public><Register/></Public>} />
      <Route path='/' element={<Protected><Home/></Protected>} />
      <Route path='/apply-doctor' element={<Protected><ApplyDoctor/></Protected>} />
      <Route path='/notifications' element={<Protected><Notifications/></Protected>} />
      <Route path='/doctors' element={<Protected><Doctors/></Protected>} />
      <Route path='/users' element={<Protected><Users/></Protected>} />
      <Route path='/profile/:userId' element={<Protected><Profile/></Protected>} />
      <Route path='/booking/:doctorId' element={<Protected><Booking/></Protected>} />
      <Route path='/appointments' element={<Protected><UserAppointments/></Protected>} />


    </Routes>
    
    </BrowserRouter>
  );
}

export default App;
