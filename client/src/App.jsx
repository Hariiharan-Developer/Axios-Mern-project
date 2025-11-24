import {Routes,Route} from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Navbar from './components/Navbar'
import Inpass from './pages/Inpass'
import Record from './pages/Record'
import Register from './pages/Register'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import ProtectedRoute from './ProtectedRoute'

function App() {

  return (
    <>
      <ToastContainer/>
    <Navbar/>
      <Routes>
          <Route path='/' element={<Dashboard/>}/>
          <Route path='/register' element={<Register/>}/>

          <Route path='/inpass' element=
          {<ProtectedRoute>
               <Inpass/>
          </ProtectedRoute>}/>
          <Route path='/record' element=
          {<ProtectedRoute>
               <Record/>
          </ProtectedRoute>}/>
                    

      </Routes>
    </>
  )
}

export default App
