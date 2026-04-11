import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import ResumePreview from "../components/ResumePreview";
import api from "../config/api";
import { ArrowLeftIcon } from "lucide-react";

const Preview = () => {
  const { resumeId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [resumeData, setresumeData] = useState(null);
  const [removeBackground, setRemoveBackground] = useState(false);

  const loadresume = async () => {
    try {
      setIsLoading(true);
      const { data } = await api.get(`/api/resumes/public/${resumeId}`);
      if (data) {
        setRemoveBackground(data.removeBackground || false);
        setresumeData({
          ...data,
          personal_info: data.personal_info || {},
          experience: data.experience || [],
          education: data.education || [],
          project: data.project || [],
          skills: data.skills || [],
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
    if (resumeId) loadresume();
  }, [resumeId]);

  // ✅ downloadResume is now defined here, before return
  const downloadResume = () => {
  const preview = document.getElementById("resume-preview");
  if (!preview) return window.print();

  const A4_HEIGHT_PX = 1123;
  const A4_WIDTH_PX = 794;

  // ✅ offsetHeight is more accurate than scrollHeight for scaled content
  const contentHeight = preview.offsetHeight;
  const contentWidth = preview.offsetWidth;

  const scaleX = A4_WIDTH_PX / contentWidth;
  const scaleY = A4_HEIGHT_PX / contentHeight;
  const scale = Math.min(scaleX, scaleY, 1);

  preview.style.transformOrigin = "top left";
  preview.style.transform = `scale(${scale})`;
  preview.style.width = `${A4_WIDTH_PX}px`;
  preview.style.height = `${A4_HEIGHT_PX}px`;
  preview.style.overflow = "hidden";

  setTimeout(() => {
    window.print();
    setTimeout(() => {
      preview.style.transform = "";
      preview.style.transformOrigin = "";
      preview.style.width = "";
      preview.style.height = "";
      preview.style.overflow = "";
    }, 1000);
  }, 300);
};

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
    <div className="bg-gray-900 min-h-screen print:bg-white print:min-h-0 print:p-0">
      {/* Hidden during print */}
      <div className="no-print mb-6 flex justify-between items-center p-6">
        <Link
          to="/"
          className="text-slate-400 hover:text-white flex items-center gap-2"
        >
          <ArrowLeftIcon className="size-4" /> Dashboard
        </Link>
        <button
          onClick={downloadResume}
          className="bg-purple-600 text-white px-4 py-2 rounded-lg"
        >
          Download PDF
        </button>
      </div>

      <div className="max-w-4xl mx-auto py-10 print:p-0">
        <div id="print-area">
          <div
            id="resume-preview"
            className="shadow-2xl print:shadow-none print:m-0"
          >
            <ResumePreview
              key={resumeData._id}
              data={resumeData}
              template={resumeData.template}
              accentColor={resumeData.accent_color}
              removeBackground={removeBackground}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preview;