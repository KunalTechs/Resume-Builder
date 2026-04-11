import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import api from "../config/api";
import { logout } from "../app/features/authSlice";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const logoutUser = async () => {
    try {
      await api.post("/api/users/logout");
      dispatch(logout());
      navigate("/");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <nav className="no-print relative z-50 flex items-center justify-between w-full py-5 px-6 md:px-16 lg:px-24 xl:px-40 border-b border-white/10 backdrop-blur-sm bg-black/40 text-white">
      {/* Updated Logo Style */}
      <Link to="/" className="flex items-center gap-2">
        <h2 className="text-2xl font-bold tracking-tighter">
          RESUME<span className="text-red-600">BUILDER</span>
        </h2>
      </Link>

      <div className="flex items-center gap-6">
        {user && (
          <div className="flex items-center gap-4 text-sm">
            <p className="text-slate-400 max-sm:hidden">
              Hi, <span className="text-white font-medium">{user.name}</span>
            </p>

            <button
              onClick={logoutUser}
              className="px-6 py-2 text-sm font-medium bg-red-600 hover:bg-red-700 rounded-full transition shadow-[0_0_15px_rgba(220,38,38,0.2)] active:scale-95"
            >
              Logout
            </button>
          </div>
        )}
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap');
        nav { font-family: 'Poppins', sans-serif; }
      `}</style>
    </nav>
  );
};

export default Navbar;