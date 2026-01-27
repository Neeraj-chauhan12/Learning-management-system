import React from 'react'
import { RxDashboard } from "react-icons/rx";
import { FaBookReader } from "react-icons/fa";

const Slidebar = ({ setView }) => {
  return (
    <>
    <div className='w-full md:w-[20vw] bg-gray-100 pt-24 px-5 h-auto md:h-screen'>
      <div className='md:sticky md:top-20'>
        <button onClick={() => setView('totaldata')} className='flex items-center gap-3 text-xl md:text-2xl font-medium mb-4 cursor-pointer'><RxDashboard />Dashboard</button>
        <button onClick={() => setView('courses')} className='flex items-center gap-3 text-xl md:text-2xl font-medium cursor-pointer'><FaBookReader />Courses</button>
      </div>
    </div>
      
    </>
  )
}

export default Slidebar
