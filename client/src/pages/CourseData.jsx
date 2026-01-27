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

                <div className='w-1/2 py-10 px-18 bg-green-200'>
                    <h1 className='text-3xl'>Description</h1>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita ratione eos
                        cupiditate maiores dolorem, nobis animi ut numquam eius natus suscipit,
                        fuga culpa porro quos voluptatibus odio soluta quasi eaque sunt optio. Ullam, illo distinctio?
                        </p>

                        <div className='border-2 border-gray-300'>

                      <h1 className='text-3xl mt-6'>Course Content</h1>
                    <ul className='list-disc ml-5 mt-2'>
                        <li>Introduction to the Course</li>
                        <li>Basics of the Subject</li>
                        <li>Advanced Topics</li>
                        <li>Practical Applications</li>
                        <li>Final Project</li>
                    </ul>

                        </div>

                 
                 



                </div>

                <div className='w-1/2 bg-red-200'>wkfwf</div>

            </div>


        </div>
    )
}

export default CourseData
