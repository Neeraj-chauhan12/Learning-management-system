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
      <div className='flex flex-col md:flex-row bg-slate-50 min-h-screen'>
        <div className='md:w-64 flex-shrink-0'>
          <Slidebar setView={setView} currentView={view} />
        </div>
        <div className='flex-1 overflow-auto'>
          {view === 'totaldata' && <TotalData />}
          {view === 'courses' && <CourseDetail />}
        </div>
      </div>
    </>
  )
}

export default Dashboard

