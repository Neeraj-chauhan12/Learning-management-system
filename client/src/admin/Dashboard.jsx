import React from 'react'
import Navbar from '../components/Navbar'
import Slidebar from './Slidebar'
import TotalData from './TotalData'
import CourseDetail from './courses/CourseDetail'

const Dashboard = () => {
  return (
    <>
    <Navbar />
    <div className='flex'>
        <div>
            <Slidebar />
        </div>
        <div>
            {/* <TotalData /> */}
            <CourseDetail />
        </div>
    </div>
      
    </>
  )
}

export default Dashboard
