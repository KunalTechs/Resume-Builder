import React from 'react'
import Title from './Title'

const Testimonial = () => {
  return (
    <>
  <div
    id="testimonials"
    className="relative flex flex-col items-center bg-black text-white min-h-screen py-16 px-4 md:px-16 lg:px-24 scroll-mt-12"
  >
    {/* Badge */}
    <div className="flex items-center divide-x divide-gray-300 py-1 text-sm border border-gray-300 rounded-full">
      <span className="pr-1 pl-3 text-lg">❤️</span>
      <span className="pl-2 pr-5 bg-gradient-to-r from-rose-500 to-indigo-500 font-medium bg-clip-text text-transparent">
        Testimonials
      </span>
    </div>

    {/* Title */}
    <Title
      title="Why People Love Our Resume Builder"
      description="Thousands of users have built resumes that reflect their true potential. See why professionals everywhere trust our builder to turn their ambitions into opportunities."
    />

    {/* Testimonials Grid */}
    <div className="mt-10 flex flex-wrap justify-center items-stretch gap-6">
      {[
        {
          img: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=600",
          text: "“This resume builder made showcasing my skills incredibly easy. I landed my first interview within a week!”",
          name: "— John Doe",
          role: "Content Marketing",
        },
        {
          img: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=600",
          text: "“Building my resume took less than 10 minutes, and it looked stunning! The AI suggestions were spot on.”",
          name: "— Sarah Williams",
          role: "UI/UX Designer",
        },
        {
          img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=600&h=600&auto=format&fit=crop",
          text: "“I’ve tried many builders before, but this one stands out. Clean design, smart tools, and zero hassle.”",
          name: "— Alex Kim",
          role: "Software Engineer",
        },
      ].map((t, i) => (
        <div
          key={i}
          className="w-[320px] min-h-[450px] bg-zinc-900 text-white rounded-2xl border border-gray-800 shadow-md hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
        >
          <div className="relative overflow-hidden rounded-t-2xl">
            <img
              src={t.img}
              alt={t.name}
              className="h-[270px] w-full object-cover object-top rounded-t-2xl hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute bottom-0 z-10 h-60 w-full bg-gradient-to-t from-black to-transparent pointer-events-none"></div>
          </div>
          <div className="px-4 pb-4 flex flex-col justify-between flex-1">
            <p className="font-medium border-b border-gray-700 pb-5 text-slate-200 flex-grow">
              {t.text}
            </p>
            <div>
              <p className="mt-4">{t.name}</p>
              <p className="text-sm font-medium bg-gradient-to-r from-[#8B5CF6] via-[#E0724A] to-[#9938CA] text-transparent bg-clip-text">
                {t.role}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>

  {/* Font Style */}
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
    * { font-family: 'Poppins', sans-serif; }
  `}</style>
</>


      
  )
}

export default Testimonial
