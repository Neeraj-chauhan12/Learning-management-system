import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Home from './pages/Home'
import Profile from './pages/Profile'
import MyLearning from './students/MyLearning'

import { ToastsContainer } from 'react-hot-toast'
import Dashboard from './admin/Dashboard'
import CreateCourse from './admin/courses/CreateCourse'
import EditCourse from './admin/courses/EditCourse'
import CreateLectures from './admin/lectures/CreateLectures'
import EditLecture from './admin/lectures/EditLecture'
import TotalData from './admin/TotalData'
import CourseData from './pages/CourseData'
import Payment from './pages/Payment'
import MyCourses from './admin/MyCourses'
import CoursePlayer from './students/CoursePlayer'

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
    
     {/* auth routes */}
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<Signup />} />
       
       {/* user routes */}
      <Route path='/' element={<Home />} />
      <Route path='/profile' element={<Profile />} />
      <Route path='/my-learning' element={<MyLearning />} />
      <Route path='/course/:courseId/learn' element={<CoursePlayer />} />
      
      {/* admin routes */}
      <Route path='/dashboard' element={<Dashboard />} />
      <Route path='/create' element={<CreateCourse />}/>
      <Route path='my-courses' element={<MyCourses />}/>
      <Route path='/edit/:id' element={<EditCourse />}/>
      <Route path='/course-detail/:courseId' element={<CourseData />}/>
      <Route path='/payment/:courseId' element={<Payment />}/>
      <Route path='/course/:courseId/lecture/create' element={<CreateLectures />}/>
      <Route path='/course/:courseId/lecture/:lectureId/edit' element={<EditLecture />}/>

    </Routes>
   
    <ToastsContainer position='bottom-right'  />
    </BrowserRouter>
    
  )
}

export default App

