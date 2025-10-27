import React from 'react'
import {Link} from 'react-router-dom'


const hero = () => {
    const [menuOpen, setMenuOpen] = React.useState(false);

    const logos = [
        'https://saasly.prebuiltui.com/assets/companies-logo/instagram.svg',
        'https://saasly.prebuiltui.com/assets/companies-logo/framer.svg',
        'https://saasly.prebuiltui.com/assets/companies-logo/microsoft.svg',
        'https://saasly.prebuiltui.com/assets/companies-logo/huawei.svg',
        'https://saasly.prebuiltui.com/assets/companies-logo/walmart.svg',
    ]
  return ( 
 <>
 <div className="relative flex flex-col items-center text-white min-h-screen pb-16 bg-black bg-[url('https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/hero/bg-gradient-4.svg')] bg-center bg-cover overflow-hidden">
  {/* Smooth gradient overlay to blend into features */}
  <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-b from-transparent via-black/90 to-black pointer-events-none"></div>


    {/* Navbar */}
    <nav className="flex items-center justify-between w-full py-4 px-6 md:px-16 lg:px-24 xl:px-40 border-b border-white/25">
      <a href="https://prebuiltui.com">
        
          <img src="logo.svg" alt="logo" className='h-11 w-auto' />
      </a>

      <div className="hidden md:flex items-center gap-8 text-white transition duration-500">
        <a href="#" className="hover:text-red-600 transition">Home</a>
        <a href="#features" className="hover:text-red-600 transition">Features</a>
        <a href="#testimonials" className="hover:text-red-600 transition">Testimonials</a>
        <a href="#cta" className="hover:text-red-600 transition">Contact</a>
      </div>

      <div className="flex gap-2">
        <Link to='/app?state=register' className="hidden md:block px-6 py-2 bg-red-600 hover:bg-red-700 rounded-full text-white transition">
          Get started
        </Link>
        <Link to='/app?state=login' className="hidden md:block px-6 py-2 border border-white/20 hover:bg-white/10 rounded-full text-white transition">
          Login
        </Link>
      </div>

      <button onClick={() => setMenuOpen(true)} className="md:hidden active:scale-90 transition text-white">
        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 5h16M4 12h16M4 19h16" />
        </svg>
      </button>
    </nav>

    {/* Mobile Menu */}
    <div className={`fixed inset-0 z-[100] bg-black/40 backdrop-blur flex flex-col items-center justify-center text-lg gap-8 md:hidden transition-transform duration-300 ${menuOpen ? "translate-x-0" : "-translate-x-full"}`}>
      <a href="#" className="text-white">Home</a>
      <a href="#features" className="text-white">Features</a>
      <a href="#testimonials" className="text-white">Testimonials</a>
      <a href="#contact" className="text-white">Contact</a>
      <button onClick={() => setMenuOpen(false)} className="active:ring-3 active:ring-white aspect-square size-10 p-1 flex items-center justify-center bg-red-600 hover:bg-red-700 rounded-md text-white transition">
        X
      </button>
    </div>

    {/* Hero Section */}
    <div className="relative flex flex-col items-center text-center px-4 md:px-16 lg:px-24 xl:px-40">
      <h1 className="text-5xl md:text-6xl font-semibold max-w-5xl mt-24 bg-gradient-to-r from-white to-[#748298] text-transparent bg-clip-text">
        Achieve your dream job with <span className="bg-gradient-to-r  from-orange-700 to-orange-600 bg-clip-text text-transparent">AI-Powered</span> resumes.
      </h1>

      <p className="max-w-md text-slate-300 text-base my-7">
        Create, edit and download professinal resumes with AI-powered assistance.
      </p>

      <div className="flex items-center gap-4">
        <Link to='/app' className="bg-red-600 hover:bg-red-700 text-white rounded-full px-9 h-12 flex items-center gap-2 transition">
          Get started
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </Link>
        <button className="flex items-center gap-2 border border-white/20 hover:bg-white/10 rounded-full px-7 h-12 text-white transition">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
            <path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5"></path>
            <rect x="2" y="6" width="14" height="12" rx="2"></rect>
          </svg>
          <span>Try demo</span>
        </button>
      </div>

      <p className="py-6 text-slate-400 mt-14">Trusted by leading brands</p>

      <div className="flex flex-wrap justify-between max-sm:justify-center gap-6 max-w-3xl w-full mx-auto py-4">
        {logos.map((logo, index) => <img key={index} src={logo} alt="logo" className="h-6 w-auto max-w-xs" />)}
      </div>
    </div>

    <style>
      {`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
        * { font-family: 'Poppins', sans-serif; }
      `}
    </style>
  </div>
</>

   
  )
}

export default hero
