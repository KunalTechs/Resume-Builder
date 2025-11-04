import React from 'react'
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Layout = () => {
  return (
    <div>
      <div className='min-h-screen bg-[#0A0A0A] shadow-lg'>
        <Navbar/>
        <Outlet/>
      </div>
    </div>
  )
}

export default Layout
