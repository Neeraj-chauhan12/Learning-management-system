import React from 'react'
import Navbar from '../components/Navbar'
import { Link } from 'react-router-dom'

const HeroSection = () => {
  return (
    <>
     <Navbar />
     <div className='mt-20 bg-gradient-to-r from-blue-600 to bg-indigo-500'>
        <div className='max-w-3xl pt-20 pb-10 flex justify-center items-center flex-col mx-auto'>
            <h1 className='text-5xl text-white font-bold mb-4'>Find the Best Courses for you</h1>
            <p className='text-gray-200 mb-6'>Discover, Learn , and Upskill with our wide range of courses</p>

            <form className='flex'>
                <input type="text" placeholder="Type here" className="input w-96 rounded-l-2xl" />
                <button className='py-2 px-7 text-white rounded-r-2xl bg-blue-900'>Search</button>
            </form>

            <div>
            <button className='px-8 py-3 border-none  font-bold mt-5 bg-white text-gray-500 rounded-2xl'><Link>Explore Courses</Link></button>
            </div>

        </div>

        </div> 
    </>
  )
}

export default HeroSection
