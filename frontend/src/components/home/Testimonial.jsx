import React from 'react';
import Title from './Title';

const Testimonial = () => {
  const testimonials = [
    {
      img: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=400",
      text: "“This resume builder made showcasing my skills incredibly easy. I landed my first interview within a week!”",
      name: "John Doe",
      role: "Content Marketing",
    },
    {
      img: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=400",
      text: "“Building my resume took less than 10 minutes, and it looked stunning! The AI suggestions were spot on.”",
      name: "Sarah Williams",
      role: "UI/UX Designer",
    },
    {
      img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=400",
      text: "“I’ve tried many builders before, but this one stands out. Clean design, smart tools, and zero hassle.”",
      name: "Alex Kim",
      role: "Software Engineer",
    },
  ];

  return (
    <section
      id="testimonials"
      className="relative flex flex-col items-center bg-black text-white py-24 px-4 md:px-16 lg:px-24 scroll-mt-12 overflow-hidden"
    >
      {/* Badge - Consistent with Hero & Features */}
      <div className="flex items-center divide-x divide-gray-600 py-1 text-sm border border-gray-700 rounded-full mb-8">
        <span className="pr-2 pl-3 text-lg">❤️</span>
        <span className="pl-2 pr-4 bg-gradient-to-r from-rose-400 to-indigo-400 font-medium bg-clip-text text-transparent">
          User Success
        </span>
      </div>

      <Title
        title="Why Professionals Love Us"
        description="Join thousands of users who have transformed their job search with resumes that truly reflect their potential."
      />

      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl">
        {testimonials.map((t, i) => (
          <div
            key={i}
            className="group relative bg-zinc-900/50 border border-gray-800 rounded-3xl p-8 hover:bg-zinc-900 transition-all duration-500 hover:border-indigo-500/30 flex flex-col gap-6"
          >
            {/* Quote Icon Background */}
            <div className="absolute top-6 right-8 text-6xl text-white/5 font-serif pointer-events-none">
              “
            </div>

            <p className="text-slate-300 leading-relaxed italic relative z-10 flex-grow">
              {t.text}
            </p>

            <div className="flex items-center gap-4 pt-6 border-t border-gray-800">
              <img
                src={t.img}
                alt={t.name}
                className="size-12 rounded-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 ring-2 ring-gray-800 group-hover:ring-indigo-500/50"
              />
              <div>
                <h4 className="font-bold text-white text-sm">{t.name}</h4>
                <p className="text-xs font-semibold bg-gradient-to-r from-rose-400 to-indigo-400 text-transparent bg-clip-text uppercase tracking-widest mt-0.5">
                  {t.role}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Decorative Background Glows */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-rose-500/5 blur-[120px] rounded-full -z-10" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-500/5 blur-[120px] rounded-full -z-10" />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
        #testimonials { font-family: 'Poppins', sans-serif; }
      `}</style>
    </section>
  );
};

export default Testimonial;