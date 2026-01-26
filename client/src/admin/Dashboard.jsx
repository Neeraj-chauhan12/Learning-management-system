import React from 'react'
import Navbar from '../components/Navbar'
import Slidebar from './Slidebar'
import TotalData from './TotalData'
import CourseDetail from './courses/CourseDetail'

const Dashboard = () => {
  return (
    <>
    <Navbar />
    <div className='flex flex-col md:flex-row'>
      <div className='w-full md:w-1/5'>
        <Slidebar />
      </div>
      <div className='flex-1'>
        {/* <TotalData /> */}
        <CourseDetail />
      </div>
    </div>
      
    </>
  )
}

export default Dashboard
