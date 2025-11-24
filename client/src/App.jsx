import {Routes,Route} from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Inpass from './pages/Inpass'
import Outpass from './pages/Outpass'
import Record from './pages/Record'
import Register from './pages/Register'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  return (
    <>
      <ToastContainer/>
    <Navbar/>
      <Routes>
          <Route path='/' element={<Dashboard/>}/>
          <Route path='/inpass' element={<Inpass/>}/>
          <Route path='/outpass' element={<Outpass/>}/>
          <Route path='/record' element={<Record/>}/>
          <Route path='/register' element={<Register/>}/>

      </Routes>
    </>
  )
}

export default App
