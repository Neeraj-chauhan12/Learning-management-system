import React from 'react'
import Navbar from '../components/Navbar'

const CourseData = () => {
    return (

        <div>
             
             
        <div className='h-screen w-full bg-gray'>
            
             <Navbar />

            <div className='bg-gray-800 text-white gap-3 px-18 pb-5  pt-24 '>
                <h1 className='text-3xl font-bold '>Course Data Page</h1>
                <p className=' mt-4'>This is the course data page.</p>
                <h1>created by <span className='underline font-semibold'>Neeraj</span></h1>
                <h1>last updated: 2024-05-15</h1>
                <h1>enrolled students: 120</h1>
            </div>

            <div className=' flex '>

                <div className='w-1/2 py-10 px-18 '>
                    <h1 className='text-3xl'>Description</h1>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita ratione eos
                        cupiditate maiores dolorem, nobis animi ut numquam eius natus suscipit,
                        fuga culpa porro quos voluptatibus odio soluta quasi eaque sunt optio. Ullam, illo distinctio?
                    </p>

                    <div className='border-2 py-4 px-5 mt-5 rounded-2xl shadow-2xs shadow-gray-300  border-black'>

                        <h1 className='text-3xl '>Course Content</h1>
                        <ul className='list-disc ml-5 mt-2'>
                            <li>Introduction to the Course</li>
                            <li>Basics of the Subject</li>
                            <li>Advanced Topics</li>
                            <li>Practical Applications</li>
                            <li>Final Project</li>
                        </ul>

                    </div>






                </div>

                <div className='w-1/2 py-10 flex justify-center items-center'>
                    <div className="card bg-base-100 w-96 shadow-sm">
                        <figure>
                            <img
                                src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                                alt="Shoes" />
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title">Card Title</h2>
                            <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
                            <div className="card-actions justify-center">
                                <button className="btn btn-primary">Buy Now</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>


        </div>
        </div>
      
        
    )
}

export default CourseData
