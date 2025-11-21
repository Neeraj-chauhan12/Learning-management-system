import React from 'react'
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'
import  { ToastsContainer}      from 'react-hot-toast'

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/signup' element={<Signup />} />
    </Routes>
    <ToastsContainer></ToastsContainer>
    </BrowserRouter>
    
  )
}

export default App
