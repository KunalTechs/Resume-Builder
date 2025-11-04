import React from 'react'
import {Link, useNavigate} from 'react-router-dom'

const Navbar = () => {
    const user = {name:'Kunal'}
    const navigate = useNavigate()

    const logoutUser =()=>{
        navigate('/')
    }
  return (
    <div className='bg-gray-800 '>
        <nav className= 'flex item-center justify-between max-w-7xl mx-auto px-4 py-3.5 text-slate-800 transition-all'>
            <Link to='/'>
            <img src="/logo.svg" alt="logo"  classname="h-11 w-auto"/>
            </Link>
            <div className='flex item-center gap-4 text-sm'>
                <p className='text-gray-400 max-sm:hidden'>Hi, {user?.name}</p>
                <button onClick={logoutUser} className='text-white bg-red-500 hover:bg-red-700 border border-gray-500 px-7 py-1.5 rounded-full active:scale-95 transition-all'>Logout</button>
            </div>
        </nav>
    </div>
  )
}

export default Navbar
