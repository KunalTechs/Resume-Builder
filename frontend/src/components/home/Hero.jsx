import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Hero = () => {
  const { user } = useSelector((state) => state.auth);
  const [menuOpen, setMenuOpen] = React.useState(false);

  return (
    <>
      <div className="relative flex flex-col items-center text-white min-h-screen pb-16 bg-black overflow-hidden">
        
        {/* Pure CSS Background Gradient (Replaces external SVG) */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-rose-900/10 blur-[120px] rounded-full" />
          <div className="absolute bottom-[20%] right-[-5%] w-[30%] h-[50%] bg-indigo-900/20 blur-[120px] rounded-full" />
        </div>

        {/* Smooth gradient overlay to blend into features */}
        <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-b from-transparent via-black/90 to-black pointer-events-none z-10"></div>

        {/* Navbar */}
        <nav className="relative z-50 flex items-center justify-between w-full py-5 px-6 md:px-16 lg:px-24 xl:px-40 border-b border-white/10 backdrop-blur-sm bg-black/20">
          <Link to="/" className="flex items-center gap-2">
            <h2 className="text-2xl font-bold tracking-tighter">
              RESUME<span className="text-red-600">BUILDER</span>
            </h2>
          </Link>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="#" className="hover:text-red-500 transition-colors">Home</a>
            <a href="#features" className="hover:text-red-500 transition-colors">Features</a>
            <a href="#testimonials" className="hover:text-red-500 transition-colors">Testimonials</a>
            <a href="#cta" className="hover:text-red-500 transition-colors">Contact</a>
          </div>

          <div className="flex gap-3">
            {!user ? (
              <>
                <Link to="/app?state=login" className="hidden md:block px-5 py-2 text-sm font-medium border border-white/10 hover:bg-white/5 rounded-full transition">
                  Login
                </Link>
                <Link to="/app?state=register" className="hidden md:block px-6 py-2 text-sm font-medium bg-red-600 hover:bg-red-700 rounded-full transition shadow-[0_0_15px_rgba(220,38,38,0.3)]">
                  Get started
                </Link>
              </>
            ) : (
              <Link to="/app" className="hidden md:block px-6 py-2 text-sm font-medium border border-red-500/50 hover:bg-red-500/10 rounded-full text-red-500 transition">
                Dashboard
              </Link>
            )}

            <button onClick={() => setMenuOpen(true)} className="md:hidden p-2 text-white">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="4" x2="20" y1="12" y2="12"></line>
                <line x1="4" x2="20" y1="6" y2="6"></line>
                <line x1="4" x2="20" y1="18" y2="18"></line>
              </svg>
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        <div className={`fixed inset-0 z-[100] bg-black backdrop-blur-xl flex flex-col items-center justify-center gap-8 md:hidden transition-all duration-500 ${menuOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}>
          <button onClick={() => setMenuOpen(false)} className="absolute top-6 right-6 p-2 text-white/50 hover:text-white transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
          <a href="#" onClick={() => setMenuOpen(false)} className="text-2xl font-bold">Home</a>
          <a href="#features" onClick={() => setMenuOpen(false)} className="text-2xl font-bold text-slate-400">Features</a>
          <a href="#cta" onClick={() => setMenuOpen(false)} className="text-2xl font-bold text-slate-400">Contact</a>
          <Link to="/app" onClick={() => setMenuOpen(false)} className="mt-4 px-10 py-3 bg-red-600 rounded-full font-bold">Get Started</Link>
        </div>

        {/* Hero Content */}
        <div className="relative z-20 flex flex-col items-center text-center px-6 max-w-6xl flex-grow justify-center">
          {/* Badge matching Features style */}
          <div className="mt-20 flex items-center divide-x divide-gray-600 py-1 text-sm border border-gray-700 rounded-full mb-8">
            <span className="pr-2 pl-3 text-lg">✨</span>
            <span className="pl-2 pr-4 bg-gradient-to-r from-rose-400 to-indigo-400 font-medium bg-clip-text text-transparent">
              The #1 AI Resume Builder
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold leading-[1.1] tracking-tight bg-gradient-to-b from-white via-white to-slate-500 text-transparent bg-clip-text">
            Achieve your dream job with <br className="hidden md:block" />
            <span className="bg-gradient-to-r from-rose-400 to-indigo-400 bg-clip-text text-transparent">
              AI-Powered
            </span> resumes.
          </h1>

          <p className="max-w-2xl text-slate-400 text-lg md:text-xl mt-8 leading-relaxed">
            Create, edit and download professional resumes in seconds. Our
            AI-driven platform ensures your career stands out to top recruiters.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-5 mt-10">
            <Link
              to="/app"
              className="group bg-red-600 hover:bg-red-700 text-white font-bold rounded-full px-12 h-14 flex items-center gap-2 transition-all hover:scale-105 shadow-xl shadow-red-900/20"
            >
              Build Your Resume Now
              <svg
                className="group-hover:translate-x-1 transition-transform"
                xmlns="http://www.w3.org/2000/svg"
                width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
              >
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </Link>
          </div>
        </div>

        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap');
          * { font-family: 'Poppins', sans-serif; }
        `}</style>
      </div>
    </>
  );
};

export default Hero;