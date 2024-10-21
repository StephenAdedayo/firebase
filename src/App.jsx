import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/home/Home'
// import Login from './pages/login/Login'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Login from './pages/login/Login';
import Create from './pages/create/Create';


const App = () => {
  return (
    <div>

      <ToastContainer />
     
      <Routes>

      <Route path='/home' element={<Home />}/>
      <Route path='/' element={<Login />}/>
      <Route path='/create' element={<Create />}/>
      
      

      </Routes>
      
    </div>
  )
}

export default App
