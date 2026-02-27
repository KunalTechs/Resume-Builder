import React from 'react';
import { useNavigate } from 'react-router-dom';

const CalltoAction = () => {
  const navigate = useNavigate();

  // Array of profile images - using high-quality professional avatars
  const avatars = [
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100&auto=format&fit=crop"
  ];

  return (
    <section className="relative bg-black py-24 px-4 overflow-hidden">
      {/* Background Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-violet-600/20 blur-[120px] rounded-full -z-10" />

      <div className="max-w-5xl mx-auto">
        <div className="relative overflow-hidden bg-gradient-to-br from-[#2e1065] via-[#1e1b4b] to-black border border-white/10 rounded-3xl p-8 md:p-16 text-left shadow-2xl">
          
          {/* Top Row: Social Proof */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8">
            <div className="flex -space-x-3">
              {avatars.map((url, i) => (
                <img 
                  key={i}
                  src={url} 
                  alt="User Profile"
                  className="size-10 rounded-full border-2 border-[#1e1b4b] object-cover hover:-translate-y-1 transition-transform cursor-pointer" 
                />
              ))}
            </div>
            
            <div className="space-y-1">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#fbbf24" className="text-amber-400">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                ))}
              </div>
              <p className="text-xs md:text-sm text-indigo-200/70 font-medium italic">
                "Boosted my interview rate by 40%" — 12k+ users
              </p>
            </div>
          </div>

          {/* Main Content */}
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-6xl font-bold text-white leading-[1.1] tracking-tight mb-6">
              Your career deserves a 
              <span className="bg-gradient-to-r from-violet-400 to-fuchsia-300 bg-clip-text text-transparent"> resume that stands out.</span>
            </h2>
            
            <p className="text-gray-400 text-lg mb-10 max-w-lg leading-relaxed">
              Don't let a poorly formatted document hold you back. Join thousands of professionals using our AI builder to land their dream roles.
            </p>

            <button 
              onClick={() => navigate('/app')}
              className=" px-6 py-2 bg-red-600 hover:bg-red-700 rounded-full text-white transition"
            >
              Get Started for Free
              <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">→</span>
            </button>
          </div>

          {/* Abstract Design Element (Bottom Right) */}
          <div className="absolute -bottom-12 -right-12 size-64 bg-violet-500/10 rounded-full blur-3xl" />
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');
        section { font-family: 'Poppins', sans-serif; }
      `}</style>
    </section>
  );
};

export default CalltoAction;