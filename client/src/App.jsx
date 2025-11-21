import React from 'react'
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'
import  { ToastsContainer}      from 'react-hot-toast'
import HeroSection from './students/HeroSection'
import Courses from './students/Courses'

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/fss' element={<HeroSection />} />
      <Route path='/' element={<Courses />} />
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<Signup />} />
    </Routes>
    <ToastsContainer></ToastsContainer>
    </BrowserRouter>
    
  )
}

export default App
