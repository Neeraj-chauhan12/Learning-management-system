import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Slidebar from './Slidebar'
import TotalData from './TotalData'
import CourseDetail from './courses/CourseDetail'

const Dashboard = () => {
  const [view, setView] = useState('totaldata')

  return (
    <>
    <Navbar />
    <div className='flex flex-col md:flex-row'>
      <div className='w-full md:w-1/5'>
        <Slidebar setView={setView} />
      </div>
      <div className='flex-1'>
        {view === 'totaldata' && <TotalData />}
        {view === 'courses' && <CourseDetail />}
      </div>
    </div>
      
    </>
  )
}

export default Dashboard
