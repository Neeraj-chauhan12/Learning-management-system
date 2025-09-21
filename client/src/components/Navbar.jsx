import React from 'react';
import { Link } from 'react-router-dom';
import pic from '../../public/WhatsApp Image 2025-09-21 at 00.52.19_645e770d.jpg'

const Navbar = () => {
  return (
    <nav className="w-full bg-gray-900 py-4 px-8 flex items-center justify-between shadow-md">
      <div className="text-2xl font-bold text-white flex gap-3 tracking-wide">
        <img className='h-16 w-16 rounded-full object-contain ' src={pic} alt="" />
        <div className='flex justify-center items-center'>
          <h1>Chauhan KnowledgeHub</h1>
        </div>
        
        
        
        
      </div>
      <div className="flex gap-4">
        <Link to="/" className="px-4 py-2 rounded bg-gray-800 text-white font-semibold hover:bg-gray-700 transition duration-200 border border-gray-700">Login</Link>
        <Link to="/signup" className="px-4 py-2 rounded bg-gray-800 text-white font-semibold hover:bg-gray-700 transition duration-200 border border-gray-700">Signup</Link>
      </div>
    </nav>
  );
};

export default Navbar;
