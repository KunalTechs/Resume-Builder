import React from 'react'
import {Navigate, Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import {useSelector} from 'react-redux'
import Loader from '../components/Loader'
import Login from './Login';

const Layout = () => {

const {user, loading} = useSelector(state => state.auth)
console.log("Redux auth:", user, loading)

 
if(loading){
  return <Loader />
}
if (!user) return <Navigate to="/login" replace />;

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
