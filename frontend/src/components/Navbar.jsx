import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import api from "../config/api";
import { logout } from "../app/features/authSlice";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);

  const logoutUser = async () => {
   
      await api.post("/api/users/logout");

      // 🔥 Clear redux user
      dispatch(logout());

      // 🔥 Redirect to login
      navigate("/");
}

  return (
    <div className='bg-gray-800 '>
      <nav className='flex item-center justify-between max-w-7xl mx-auto px-4 py-3.5'>
        <Link to='/'>
          <img src="/logo.svg" alt="logo" className="h-11 w-auto" />
        </Link>

        <div className='flex item-center gap-4 text-sm'>
          <p className='text-gray-400 max-sm:hidden'>Hi, {user?.name}</p>

          <button 
            onClick={logoutUser} 
            className='text-white bg-red-500 hover:bg-red-700 border border-gray-500 px-7 py-1.5 rounded-full'>
            Logout
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;

