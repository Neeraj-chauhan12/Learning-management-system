import React from 'react';
import { Link } from 'react-router-dom';
import { IoReorderThreeOutline } from "react-icons/io5";
import pic from '../../public/WhatsApp Image 2025-09-21 at 00.52.19_645e770d.jpg'

const Navbar = () => {

  const user=true;

  return (
    <nav className="w-full bg-gray-900 fixed top-0 left-0 right-0 py-4 px-8 flex items-center justify-between shadow-md">
      <div className="text-2xl font-bold text-white flex gap-3 tracking-wide">
        <img className='md:h-16 md:w-16 h-7 w-7 rounded-full object-contain ' src={pic} alt="" />
        <div className='flex md:justify-center justify-start items-center'>
          <h1 className='md:text-2xl text-sm'>Chauhan KnowledgeHub</h1>
        </div> 
        
      </div>


      <div>
        {/* for desktop */}
         {
        user ? 
        (  <div className="hidden md:block md:flex gap-4">
        <Link to="/" className="px-4 py-2 rounded bg-gray-800 text-white font-semibold hover:bg-gray-700 transition duration-200 border border-gray-700">Login</Link>
        <Link to="/signup" className="px-4 py-2 rounded bg-gray-800 text-white font-semibold hover:bg-gray-700 transition duration-200 border border-gray-700">Signup</Link>
      </div>
      ):(
      <div className='hidden md:block flex gap-4'>
          <div className="dropdown dropdown-end">
       <div tabIndex={0} role="button" className="btn m-1">Click</div>
          <div tabIndex="-1" className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
            <Link to={'#'} >Profile</Link>
           <Link to={'#'} >My Account</Link>
           <Link to={'#'} >My learning</Link>
           <Link to={'#'} >Log out</Link>
           <Link to={'#'} >Dashboard</Link>  
        </div>
     </div>
      <button className='text-2xl text-white'> light</button>

      </div>
    
      )
      }

      </div>
     
     
    
      
    <button className='md:hidden text-3xl text-white'><IoReorderThreeOutline /></button>
   
    </nav>
  );
};

export default Navbar;
