import React from 'react';
import Title from './Title';

const Features = () => {
  const [isHover, setIsHover] = React.useState(false);

  // Feature Data Array for cleaner mapping (optional, but kept inline for your request)
  return (
    <div
      id="features"
      className="relative flex flex-col items-center bg-black text-white min-h-screen py-16 px-4 md:px-16 lg:px-24 scroll-mt-12 overflow-hidden"
    >
      {/* Badge */}
      <div className="flex items-center divide-x divide-gray-600 py-1 text-sm border border-gray-700 rounded-full mb-8">
        <span className="pr-2 pl-3">🚀</span>
        <span className="pl-2 pr-4 bg-gradient-to-r from-rose-400 to-indigo-400 font-medium bg-clip-text text-transparent">
          Platform Features
        </span>
      </div>

      <Title
        title="Build Your Future"
        description="Our intelligent process helps you land your dream job by creating a high-impact professional resume in minutes."
      />

      <div className="flex flex-col lg:flex-row items-center justify-center gap-16 mt-12 w-full max-w-7xl">
        
        {/* Left Side: Enhanced CSS-Based Resume Mockup */}
<div className="relative group hidden lg:block">
  {/* Main "Paper" */}
  <div className="w-[420px] h-[580px] bg-white rounded-sm shadow-[0_20px_50px_rgba(0,0,0,0.5)] transform -rotate-2 group-hover:rotate-0 transition-all duration-700 ease-in-out overflow-hidden relative">
    
    {/* Blue Sidebar Mockup (Represents your 'Modern' Template) */}
    <div className="absolute left-0 top-0 bottom-0 w-24 bg-indigo-600 flex flex-col items-center py-6 gap-4">
       <div className="size-12 rounded-full bg-indigo-400/50 border border-white/20" /> {/* Profile Image mockup */}
       <div className="w-12 h-2 bg-indigo-400/30 rounded" />
       <div className="w-12 h-2 bg-indigo-400/30 rounded" />
    </div>

    {/* Content Mockup */}
    <div className="ml-24 p-8 space-y-4">
      <div className="h-6 w-40 bg-slate-200 rounded mb-6" /> {/* Name mockup */}
      <div className="space-y-2">
        <div className="h-3 w-full bg-slate-100 rounded" />
        <div className="h-3 w-full bg-slate-100 rounded" />
        <div className="h-3 w-2/3 bg-slate-100 rounded" />
      </div>
      <div className="pt-6 space-y-4">
        <div className="h-4 w-24 bg-slate-200 rounded" /> {/* Section Title */}
        <div className="flex gap-2">
           <div className="h-8 w-20 bg-slate-50 border border-slate-200 rounded" />
           <div className="h-8 w-20 bg-slate-50 border border-slate-200 rounded" />
        </div>
      </div>
    </div>
  </div>

  {/* Floating "AI Badge" (Representing your AI Summary feature) */}
  <div className="absolute -top-6 -right-10 bg-black border border-slate-700 p-3 rounded-xl shadow-xl flex items-center gap-3 animate-bounce hover:pause transition-all">
    <div className="size-8 rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center">
       <span className="text-white text-xs">✨</span>
    </div>
    <div>
       <p className="text-[10px] text-slate-400 leading-none">AI Summary</p>
       <p className="text-xs font-bold text-white">Generated!</p>
    </div>
  </div>

  {/* Floating "Download" Badge */}
  <div className="absolute bottom-10 -left-12 bg-emerald-950 border border-emerald-500/30 p-3 rounded-xl shadow-xl flex items-center gap-3 transform group-hover:translate-x-4 transition-transform duration-700">
    <div className="size-8 rounded-lg bg-emerald-500 flex items-center justify-center text-white">
       <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M7 10l5 5m0 0l5-5m-5 5V3"></path></svg>
    </div>
    <p className="text-xs font-medium text-emerald-400">PDF Ready</p>
  </div>

  {/* Decorative Glow background */}
  <div className="absolute -inset-10 bg-indigo-500/10 blur-[100px] -z-10" />
</div>

        {/* Right Side: Features List */}
        <div 
          className="flex flex-col gap-6 w-full max-w-lg"
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
        >
          {/* Feature 1: Builder */}
          <div className="group cursor-pointer">
            <div className={`p-6 rounded-2xl border transition-all duration-300 flex gap-5 ${
              !isHover || isHover ? "bg-white/5 border-white/10 hover:border-violet-500/50 hover:bg-violet-500/5" : ""
            }`}>
              <div className="flex-shrink-0 size-12 rounded-lg bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z"/></svg>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-white group-hover:text-violet-400 transition-colors">Real-Time Builder</h3>
                <ul className="text-sm text-slate-400 space-y-1 list-disc pl-4">
                  <li>Side-by-side live editing preview</li>
                  <li>Guided multi-step form interface</li>
                  <li>Visual progress tracking</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Feature 2: Customization */}
          <div className="group cursor-pointer">
            <div className="p-6 rounded-2xl border border-white/10 bg-white/5 hover:border-emerald-500/50 hover:bg-emerald-500/5 transition-all duration-300 flex gap-5">
              <div className="flex-shrink-0 size-12 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9.06 11.907 8.077-8.077a1.125 1.125 0 0 1 1.59 1.59l-8.077 8.077a1.125 1.125 0 0 1-1.59-1.59Z"/><path d="M18.5 12.5a1.5 1.5 0 1 1 3 0l-3 4H9l-3-4a1.5 1.5 0 1 1 3 0l3 4Z"/><path d="M12 16.5V22"/></svg>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-white group-hover:text-emerald-400 transition-colors">Smart Customization</h3>
                <ul className="text-sm text-slate-400 space-y-1 list-disc pl-4">
                  <li>Premium Modern & Minimalist templates</li>
                  <li>One-click accent color switching</li>
                  <li>AI-assisted professional summaries</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Feature 3: Privacy */}
          <div className="group cursor-pointer">
            <div className="p-6 rounded-2xl border border-white/10 bg-white/5 hover:border-orange-500/50 hover:bg-orange-500/5 transition-all duration-300 flex gap-5">
              <div className="flex-shrink-0 size-12 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-white group-hover:text-orange-400 transition-colors">Export & Privacy</h3>
                <ul className="text-sm text-slate-400 space-y-1 list-disc pl-4">
                  <li>High-quality PDF export (A4/Letter)</li>
                  <li>Toggle public/private link visibility</li>
                  <li>Unique shareable portfolio URLs</li>
                </ul>
              </div>
            </div>
          </div>

        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
        #features { font-family: 'Poppins', sans-serif; }
      `}</style>
    </div>
  );
};

export default Features;