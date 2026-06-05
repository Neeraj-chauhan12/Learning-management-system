import React from 'react'
import Navbar from '../components/Navbar'
import { FaLock, FaCheck } from "react-icons/fa6";
import { FaRegPlayCircle } from "react-icons/fa";
import { MdAccessTime, MdGroup, MdUpdate } from "react-icons/md";
import PurchaseButton from '../components/PurchaseButton';
import { useGetLectureQuery } from '../features/api/lectureApi';
import { useParams } from 'react-router-dom';
import { useGetCourseByIdQuery } from '../features/api/courseApi';
import { useLoadUserQuery } from '../features/api/authApi';

const CourseData = () => {
    
     // Example variable to determine purchase status
    const courseId=useParams().courseId;
    const {data:profile}=useLoadUserQuery();
    console.log("profile", profile)
    const isPurchased = profile?.user?.enrollCourse?.some((course) => course._id === courseId);
    console.log("isPurchased", isPurchased)

   const {data, isLoading: _isLoading} = useGetLectureQuery(courseId)
   console.log("lectures", data)

   const {data: courseData, isLoading: _isCourseLoading} = useGetCourseByIdQuery(courseId)
    console.log("courseData in", courseData)

   

    return (
        <div className="min-h-screen bg-slate-50">
            <Navbar />

            {/* Hero Section */}
            <div className='bg-slate-950 text-white pt-28 pb-12 px-4'>
                <div className='mx-auto max-w-7xl'>
                    <div className='mb-6'>
                        <span className='inline-block rounded-full bg-white/20 px-4 py-1 text-sm font-semibold backdrop-blur'>Premium Course</span>
                    </div>
                    <h1 className='text-4xl md:text-5xl font-bold mb-4'>Advanced Web Development Mastery</h1>
                    <p className='text-lg text-white/90 mb-6 max-w-2xl'>Learn professional web development from industry experts with hands-on projects and real-world applications.</p>
                    
                    <div className='grid grid-cols-2 md:grid-cols-4 gap-4 pt-6'>
                        <div className='flex items-center gap-2'>
                            <FaRegPlayCircle className='text-xl' />
                            <div>
                                <p className='text-xs text-white/75'>Lessons</p>
                                <p className='font-semibold'>{data?.lectures?.length || 0} Videos</p>
                            </div>
                        </div>
                        <div className='flex items-center gap-2'>
                            <MdAccessTime className='text-xl' />
                            <div>
                                <p className='text-xs text-white/75'>Duration</p>
                                <p className='font-semibold'>48 Hours</p>
                            </div>
                        </div>
                        <div className='flex items-center gap-2'>
                            <MdGroup className='text-xl' />
                            <div>
                                <p className='text-xs text-white/75'>Students</p>
                                <p className='font-semibold'>120 Enrolled</p>
                            </div>
                        </div>
                        <div className='flex items-center gap-2'>
                            <MdUpdate className='text-xl' />
                            <div>
                                <p className='text-xs text-white/75'>Updated</p>
                                <p className='font-semibold'>May 2024</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className='mx-auto max-w-7xl px-4 py-12'>
                <div className='grid md:grid-cols-3 gap-8'>
                    {/* Left Section - Description & Content */}
                    <div className='md:col-span-2 space-y-8'>
                        {/* Instructor Info */}
                        <div className='rounded-2xl bg-white p-6 shadow-lg shadow-slate-900/5 border border-slate-200'>
                            <div className='flex items-center gap-4'>
                                <img src="https://img.daisyui.com/images/profile/demo/batperson@192.webp" alt="Instructor" className='h-16 w-16 rounded-full object-cover' />
                                <div>
                                    <h3 className='text-lg font-semibold text-slate-950'>{courseData?.course?.creator?.username}</h3>
                                    <p className='text-sm text-slate-600'>Expert Instructor • 8+ Years Experience</p>
                                </div>
                            </div>
                        </div>

                        {/* Description */}
                        <div className='space-y-4'>
                            <h2 className='text-2xl font-bold text-slate-950'>About This Course</h2>
                            <p className='text-slate-700 leading-relaxed'>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita ratione eos
                                cupiditate maiores dolorem, nobis animi ut numquam eius natus suscipit,
                                fuga culpa porro quos voluptatibus odio soluta quasi eaque sunt optio. Ullam, illo distinctio?
                            </p>
                        </div>

                        {/* Course Content */}
                        <div className='rounded-2xl bg-white p-6 shadow-lg shadow-slate-900/5 border border-slate-200'>
                            <h3 className='text-2xl font-bold text-slate-950 mb-6'>Course Content</h3>
                            <div className='space-y-3'>
                                {data?.lectures?.map((item, idx) => (
                                    <div
                                        key={item.id}
                                        className='flex items-center gap-4 rounded-lg border border-slate-200 bg-slate-50 p-4 transition hover:bg-slate-100'
                                    >
                                        <div className='flex-shrink-0'>
                                            {item?.locked ? (
                                                <FaLock className='text-xl text-slate-400' />
                                            ) : (
                                                <div className='flex h-8 w-8 items-center justify-center rounded-full bg-green-100'>
                                                    <FaCheck className='text-sm text-green-600' />
                                                </div>
                                            )}
                                        </div>
                                        <div className='flex-1'>
                                            <p className={`font-medium ${item?.locked ? 'text-slate-500' : 'text-slate-950'}`}>
                                                Lesson {idx + 1}: {item?.lectureTitle}
                                            </p>
                                        </div>
                                        <span className='text-xs font-semibold text-slate-600'>15 min</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Section - Course Card */}

                    {/* Right Section - Course Card */}
                    <div className='sticky top-32 h-fit'>
                        <div className='overflow-hidden rounded-2xl bg-white shadow-2xl shadow-slate-900/10'>
                            {/* Card Image */}
                            <div className='relative overflow-hidden bg-slate-800 h-48'>
                                <img
                                    src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                                    alt="Course thumbnail"
                                    className='h-full w-full object-cover opacity-90'
                                />
                                <div className='absolute inset-0 bg-slate-950/70' />
                            </div>

                            {/* Card Body */}
                            <div className='p-6 space-y-6'>
                                {/* Price Section */}
                                <div className='space-y-2'>
                                    <p className='text-sm font-medium text-slate-600'>Course Price</p>
                                    <div className='flex items-baseline gap-2'>
                                        <span className='text-4xl font-bold text-slate-950'>₹{courseData?.course?.coursePrice}</span>
                                        <span className='text-lg text-slate-500 line-through'>₹9,999</span>
                                    </div>
                                    <p className='text-sm text-green-600 font-semibold'>50% Off</p>
                                </div>

                                {/* Features */}
                                <ul className='space-y-3'>
                                    <li className='flex items-center gap-3'>
                                        <FaCheck className='h-5 w-5 text-green-600 flex-shrink-0' />
                                        <span className='text-sm text-slate-700'>Lifetime access</span>
                                    </li>
                                    <li className='flex items-center gap-3'>
                                        <FaCheck className='h-5 w-5 text-green-600 flex-shrink-0' />
                                        <span className='text-sm text-slate-700'>Certificate of completion</span>
                                    </li>
                                    <li className='flex items-center gap-3'>
                                        <FaCheck className='h-5 w-5 text-green-600 flex-shrink-0' />
                                        <span className='text-sm text-slate-700'>24/7 Support</span>
                                    </li>
                                    <li className='flex items-center gap-3'>
                                        <FaCheck className='h-5 w-5 text-green-600 flex-shrink-0' />
                                        <span className='text-sm text-slate-700'>Projects & Assignments</span>
                                    </li>
                                </ul>

                                {/* Purchase Button */}
                                <div className='border-t border-slate-200 pt-6'>
                                    {isPurchased ? (
                                        <button className='w-full rounded-xl bg-blue-600 py-3 font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:bg-blue-700'>
                                            Continue Learning
                                        </button>
                                    ) : (
                                        <PurchaseButton
                                          courseId={courseId}
                                        />
                                    )}
                                </div>

                                {/* Info Text */}
                                <p className='text-xs text-center text-slate-600'>
                                    30-day money-back guarantee if you're not satisfied
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CourseData

