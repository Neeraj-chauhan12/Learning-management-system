import React from 'react'
import Navbar from '../components/Navbar'

const CourseData = () => {
  return (
    <div className='h-screen w-full bg-gray'>
        <Navbar />

        <div className='bg-gray-800 text-white px-18 mt-16 py-5 '>
            <h1 className='text-3xl font-bold '>Course Data Page</h1>
            <p className=' mt-4'>This is the course data page.</p>
            <h1>created by <span className='underline font-semibold'>Neeraj</span></h1>
            <h1>last updated: 2024-05-15</h1>
            <h1>enrolled students: 120</h1>
        </div>

        <div className=' flex '>

            <div className='w-1/2 bg-green-200'>
            
            </div>

            <div className='w-1/2 bg-red-200'>wkfwf</div>

        </div>
        
      
    </div>
  )
}

export default CourseData
