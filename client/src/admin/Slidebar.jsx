import React from 'react'
import { Link } from 'react-router-dom'
import { RxDashboard } from "react-icons/rx";
import { FaBookReader } from "react-icons/fa";

const Slidebar = () => {
  return (
    <>
    <div className='h-screen w-[20vw] bg-gray-100 pt-24 px-5'>
       
       
       <Link className='flex items-center gap-3 text-2xl font-medium mb-4'><RxDashboard />Dashboard</Link>
       <Link className='flex items-center gap-3 text-2xl font-medium'><FaBookReader />Courses</Link>

    </div>
      
    </>
  )
}

export default Slidebar
