import React from 'react'

const features = () => {
     const [isHover, setIsHover] = React.useState(false);
  return (
 <div
  id="features"
  className="relative flex flex-col items-center bg-black text-white min-h-screen py-16 px-4 md:px-16 lg:px-24 scroll-mt-12"
>
    <div className="flex items-center divide-x divide-gray-300 py-1 text-sm border border-gray-300 rounded-full">
        <span className="pr-1 pl-3 text-lg">🔥</span>
            <span className="pl-2 pr-5 bg-gradient-to-r from-rose-500 to-indigo-500 font-medium bg-clip-text text-transparent">
                Simple Process
            </span>
        </div>


  <div className="flex flex-col md:flex-row items-center justify-center gap-10">
    <img
      className="max-w-2xl w-full xl:-ml-32"
      src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/features/group-image-1.png"
      alt=""
    />

    <div
      className="px-4 md:px-0"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >


      {/* Feature 1 */}
      <div className="flex items-center justify-center gap-6 max-w-md group cursor-pointer">
        <div
          className={`p-6 bg-white/10 border border-transparent group-hover:border-violet-400 group-hover:bg-violet-950/30 flex gap-4 rounded-xl transition-all duration-300 ${
            !isHover ? "border-violet-400 bg-violet-950/30" : ""
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="size-6 stroke-violet-400"
          >
            <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z" />
            <circle cx="16.5" cy="7.5" r=".5" fill="currentColor" />
          </svg>
          <div className="space-y-2">
            <h3 className="text-base font-semibold text-white">
              Real-Time Analytics
            </h3>
            <p className="text-sm text-slate-300 max-w-xs">
              Get instant insights into your finances with live dashboards.
            </p>
          </div>
        </div>
      </div>

      {/* Feature 2 */}
      <div className="flex items-center justify-center gap-6 max-w-md group cursor-pointer mt-6">
        <div className="p-6 bg-white/10 border border-transparent group-hover:border-green-400 group-hover:bg-green-950/30 flex gap-4 rounded-xl transition-all duration-300">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="size-6 stroke-green-400"
          >
            <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
            <path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z" />
          </svg>
          <div className="space-y-2">
            <h3 className="text-base font-semibold text-white">
              Bank-Grade Security
            </h3>
            <p className="text-sm text-slate-300 max-w-xs">
              End-to-end encryption, 2FA, compliance with GDPR standards.
            </p>
          </div>
        </div>
      </div>

      {/* Feature 3 */}
      <div className="flex items-center justify-center gap-6 max-w-md group cursor-pointer mt-6">
        <div className="p-6 bg-white/10 border border-transparent group-hover:border-orange-400 group-hover:bg-orange-950/30 flex gap-4 rounded-xl transition-all duration-300">
          <svg
            className="size-6 stroke-orange-400"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 15V3" />
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <path d="m7 10 5 5 5-5" />
          </svg>
          <div className="space-y-2">
            <h3 className="text-base font-semibold text-white">
              Customizable Reports
            </h3>
            <p className="text-sm text-slate-300 max-w-xs">
              Export professional, audit-ready financial reports for tax or
              internal review.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
    * { font-family: 'Poppins', sans-serif; }
  `}</style>
</div>

  )
}

export default features
