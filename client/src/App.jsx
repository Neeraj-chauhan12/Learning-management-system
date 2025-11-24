import React from 'react'
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Home from './pages/Home'
import Profile from './students/Profile'
import MyLearning from './students/MyLearning'

import { ToastsContainer } from 'react-hot-toast'
import Dashboard from './admin/Dashboard'

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/profile' element={<Profile />} />
      <Route path='/my-learning' element={<MyLearning />} />
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/dashboard' element={<Dashboard />} />
    </Routes>
   
    <ToastsContainer position='bottom-right'  />
    </BrowserRouter>
    
  )
}

export default App
