import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import ResumePreview from "../components/ResumePreview";
import api from "../config/api"; // Ensure this points to your axios config
import { ArrowLeftIcon } from "lucide-react";

const Preview = () => {
  const { resumeId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [resumeData, setresumeData] = useState(null);

  // --- THE UPDATED LOAD LOGIC ---
  const loadresume = async () => {
    try {
      setIsLoading(true);
      // Fetch from your MongoDB backend
      const { data } = await api.get(`/api/resumes/get/${resumeId}`);
      
      if (data) {
        console.log("Real DB Data:", data);
        // Ensure defaults so the template doesn't crash
        setresumeData({
          ...data,
          personal_info: data.personal_info || {},
          experience: data.experience || [],
          education: data.education || [],
          project: data.project || [],
          skills: data.skills || []
        });
      }
    } catch (error) {
      console.error("Fetch Error:", error.message);
      setresumeData(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (resumeId) {
      loadresume();
    }
  }, [resumeId]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </div>
    );
  }

  if (!resumeData) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-black">
        <p className="text-center text-4xl text-slate-400 font-medium">
          Resume not found
        </p>
        <Link
          to="/"
          className="mt-6 bg-red-500 hover:bg-red-600 text-white rounded-full px-6 py-2 flex items-center transition-colors"
        >
          <ArrowLeftIcon className="mr-2 size-4" />
          Go to Home Page
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 min-h-screen">
      <div className="max-w-4xl mx-auto py-10 px-4">
        {/* Navigation back to editor (only shows if user is editing their own) */}
        <div className="mb-6 flex justify-between items-center">
           <Link to="/" className="text-slate-400 hover:text-white flex items-center gap-2">
              <ArrowLeftIcon className="size-4" /> Dashboard
           </Link>
           <button 
             onClick={() => window.print()} 
             className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
           >
             Download PDF
           </button>
        </div>

        <div className="shadow-2xl">
          <ResumePreview
            key={resumeData._id}
            data={resumeData}
            template={resumeData.template}
            accentColor={resumeData.accent_color}
          />
        </div>
      </div>
    </div>
  );
};

export default Preview;