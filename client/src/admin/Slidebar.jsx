import React from 'react'
import { RxDashboard } from "react-icons/rx";
import { FaBookReader } from "react-icons/fa";

const Slidebar = ({ setView, currentView }) => {
  const menuItems = [
    { id: 'totaldata', label: 'Dashboard', icon: RxDashboard },
    { id: 'courses', label: 'Courses', icon: FaBookReader },
  ]

  return (
    <div className='w-full md:w-64 bg-slate-950 pt-24 px-4 md:px-6 h-auto md:h-screen md:sticky md:top-0 md:overflow-y-auto border-r border-white/10'>
      <div className='space-y-3 md:space-y-2'>
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = currentView === item.id
          return (
            <button
              key={item.id}
              onClick={() => setView(item.id)}
              className={`w-full flex items-center gap-4 px-4 py-3 rounded-lg text-base font-medium transition-all ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-lg shadow-cyan-500/20'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Icon className='text-lg' />
              <span>{item.label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default Slidebar

