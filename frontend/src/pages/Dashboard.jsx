import React, { useState, useEffect } from "react";
import {
  PlusIcon,
  Upload,
  TrashIcon,
  PencilIcon,
  FilePenIcon,
  XIcon,
  LoaderCircleIcon,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import api from "../config/api";
import toast from "react-hot-toast";
import pdfToText from "react-pdftotext";

const colors = [
  "rgba(99, 102, 241, 1)", // Indigo-500
  "rgba(147, 51, 234, 1)", // Purple-600
  "rgba(6, 182, 212, 1)", // Cyan-500
  "rgba(14, 165, 233, 1)", // Sky-500
  "rgba(79, 70, 229, 1)", // Indigo-600
];

const Dashboard = () => {
  const { user, token } = useSelector((state) => state.auth);

  const [allResumes, setAllResumes] = useState([]);
  const [showCreateResume, setShowCreateResume] = useState(false);
  const [showUploadResume, setShowUploadResume] = useState(false);
  const [title, setTitle] = useState("");
  const [resume, setResume] = useState(null);
  const [editResumeId, setEditResumeId] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const loadAllResumes = async () => {
    try {
      const { data } = await api.get("/api/users/resumes");
      setAllResumes(data.resumes);
    } catch (error) {
      toast.error(error.response?.data?.message || "Auth Error");
    }
  };

  // for popup message button to naviagte
  const createResume = async (event) => {
    try {
      event.preventDefault();

      const { data } = await api.post("/api/resumes/create", { title });

      setAllResumes([...allResumes, data.resume]);
      navigate(`/app/builder/${data.resume._id}`);
    } catch (error) {
      toast.error(error.response?.data?.message || "Auth Error");
    }
  };

  // for popup message button to navigate
  const uploadResume = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const resumeText = await pdfToText(resume);
      const { data } = await api.post("/api/ai/upload-resume", {
        title,
        resumeText,
      },{ timeout: 120000 });
      setTitle("");
      setResume(null);
      setShowUploadResume(false);
      navigate(`/app/builder/${data.resumeId}`);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
    setIsLoading(false);
  };

  const editTitle = async (event) => {
    try {
      event.preventDefault();
     const { data } = await api.put(`/api/resumes/update/`,{resumeId:editResumeId, resumeData: {title}} );
     setAllResumes(prev => 
      prev.map(resume => resume._id === editResumeId ? { ...resume, title } : resume)
    );
      setTitle('')
      setEditResumeId('');
      toast.success(data.message)
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  const deleteResume = async (resumeId) => {
    try {
      const confirm = window.confirm(
      "Are you sure you want to delete this resume?"
    );
    if (confirm) {
     const { data } = await api.delete(`/api/resumes/delete/${resumeId}`)
      setAllResumes((prev) => prev.filter((resume) => resume._id !== resumeId));
      toast.success(data.message)
    }
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
    
  };

  useEffect(() => {
    loadAllResumes();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <p className="text-3xl font-semibold mb-10 bg-gradient-to-r from-indigo-400 to-blue-500 bg-clip-text text-transparent">
          Welcome, Kunal
        </p>

        {/* Action Buttons */}
        <div className="flex gap-8 flex-wrap">
          <button
            onClick={() => setShowCreateResume(true)}
            className="group w-40 h-40 flex flex-col items-center justify-center 
                       bg-gradient-to-br from-indigo-500 via-purple-600 to-blue-700 
                       rounded-2xl shadow-lg hover:shadow-indigo-500/40 
                       hover:scale-105 transition-all duration-300 border border-indigo-700"
          >
            <PlusIcon className="size-10 text-white mb-2 transition-all duration-300 group-hover:-translate-y-1 group-hover:scale-110" />
            <span className="text-white font-medium group-hover:text-indigo-200 transition-colors duration-300">
              Create Resume
            </span>
          </button>

          <button
            onClick={() => setShowUploadResume(true)}
            className="group w-40 h-40 flex flex-col items-center justify-center 
                       bg-gradient-to-br from-cyan-500 via-blue-500 to-violet-600 
                       rounded-2xl shadow-lg hover:shadow-cyan-400/40 
                       hover:scale-105 transition-all duration-300 border border-cyan-700"
          >
            <Upload className="size-10 text-white mb-2 transition-all duration-300 group-hover:-translate-y-1 group-hover:scale-110" />
            <span className="text-white font-medium group-hover:text-cyan-200 transition-colors duration-300">
              Upload Existing
            </span>
          </button>
        </div>

        <hr className="border-slate-600 my-6 sm:w-[305px]" />

        {/* Resume Cards */}
        <div className="grid grid-cols-2 sm:flex flex-wrap gap-6">
          {allResumes.map((resume, index) => {
            const baseColor = colors[index % colors.length];
            const light = baseColor.replace("1)", "0.15)");
            const mid = baseColor.replace("1)", "0.35)");
            const shadow = baseColor.replace("1)", "0.25)");

            return (
              <button
                key={index}
                onClick={() => navigate(`/app/builder/${resume._id}`)}
                className="relative w-full sm:w-40 h-48 flex flex-col items-center justify-center rounded-2xl 
                           backdrop-blur-sm border group hover:shadow-lg hover:scale-105 
                           transition-all duration-300 cursor-pointer"
                style={{
                  background: `linear-gradient(135deg, ${light} 0%, ${mid} 100%)`,
                  borderColor: mid,
                  boxShadow: `0 0 20px ${shadow}`,
                }}
              >
                <FilePenIcon
                  className="size-8 group-hover:scale-110 transition-transform duration-300"
                  style={{ color: baseColor }}
                />
                <p
                  className="text-sm font-medium group-hover:text-white transition-all duration-300 px-2 text-center"
                  style={{ color: baseColor }}
                >
                  {resume.title}
                </p>
                <p className="text-xs text-gray-400">
                  Updated on {new Date(resume.updatedAt).toLocaleDateString()}
                </p>

                <div
                  onClick={(e) => e.stopPropagation()}
                  className="absolute top-2 right-2 hidden group-hover:flex items-center gap-2"
                >
                  <TrashIcon
                    onClick={() => deleteResume(resume._id)}
                    className="size-5 p-1 hover:bg-white/30 rounded transition-colors"
                  />
                  <PencilIcon
                    onClick={() => {
                      setEditResumeId(resume._id);
                      setTitle(resume.title);
                    }}
                    className="size-5 p-1 hover:bg-white/30 rounded transition-colors"
                  />
                </div>
              </button>
            );
          })}
        </div>

        {/* for showing popup when click on createResume */}
        {showCreateResume && (
          <form
            onSubmit={createResume}
            onClick={() => setShowCreateResume(false)}
            className="fixed inset-0 bg-black/70 backdrop-blur z-10 flex items-center justify-center"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative bg-black border shadow-md rounded-lg w-full max-w-sm p-6"
            >
              <h2 className="text-xl font-bold mb-4 text-white-400">
                Create a Resume
              </h2>
              <input
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                type="text"
                placeholder="Enter resume title"
                className="w-full px-4 py-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-600"
                required
              />
              <button
                type="submit"
                className="w-full py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
              >
                Create Resume
              </button>

              <XIcon
                className="absolute top-4 right-4 text-slate-500 hover:text-slate-600 cursor-pointer transition-colors"
                onClick={() => {
                  setShowCreateResume(false);
                  setTitle("");
                }}
              />
            </div>
          </form>
        )}

        {/* for showing popup when click on uploadResume */}
        {showUploadResume && (
          <form
            onSubmit={uploadResume}
            onClick={() => setShowUploadResume(false)}
            className="fixed inset-0 bg-black/70 backdrop-blur z-10 flex items-center justify-center"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative bg-neutral-900 border border-slate-700 shadow-lg rounded-lg w-full max-w-sm p-6"
            >
              <h2 className="text-xl font-bold mb-4 text-white">
                Upload a Resume
              </h2>

              <input
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                type="text"
                placeholder="Enter resume title"
                className="w-full px-4 py-2 mb-4 border border-slate-600 bg-transparent text-white rounded focus:outline-none focus:ring-2 focus:ring-red-600 placeholder-slate-400"
                required
              />

              <div>
                <label
                  htmlFor="resume-input"
                  className="text-sm text-slate-400"
                >
                  Select resume file
                  <div className="flex flex-col items-center justify-center gap-2 border border-dashed border-slate-500 rounded-md p-4 py-10 my-4 text-slate-400 hover:border-red-500 hover:text-red-500 cursor-pointer transition-colors group">
                    {resume ? (
                      <p className="text-red-600 font-medium">{resume.name}</p>
                    ) : (
                      <>
                        <Upload className="size-14 stroke-1 group-hover:stroke-red-500" />
                        <p>Upload resume</p>
                      </>
                    )}
                  </div>
                </label>
                <input
                  id="resume-input"
                  type="file"
                  className="hidden"
                  onChange={(e) => setResume(e.target.files[0])}
                  accept=".pdf,.doc,.docx"
                  required
                />
              </div>

              <button 
              disabled={isLoading}
                type="submit"
                className="w-full py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
              >
                {isLoading && <LoaderCircleIcon className="animate-spin size-4 text-white"/>}
                {isLoading ? 'Uploading....': 'Upload Resume'}
              </button>

              <XIcon
                className="absolute top-4 right-4 text-slate-500 hover:text-slate-300 cursor-pointer transition-colors"
                onClick={() => {
                  setShowUploadResume(false);
                  setTitle("");
                  setResume(null);
                }}
              />
            </div>
          </form>
        )}

        {editResumeId && (
          <form
            onSubmit={editTitle}
            onClick={() => setEditResumeId()}
            className="fixed inset-0 bg-black/70 backdrop-blur z-10 flex items-center justify-center"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative bg-black border shadow-md rounded-lg w-full max-w-sm p-6"
            >
              <h2 className="text-xl font-bold mb-4 text-white-400">
                Edit Resume Title
              </h2>
              <input
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                type="text"
                placeholder="Enter resume title"
                className="w-full px-4 py-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-600"
                required
              />
              <button
                type="submit"
                className="w-full py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
              >
                Update
              </button>

              <XIcon
                className="absolute top-4 right-4 text-slate-500 hover:text-slate-600 cursor-pointer transition-colors"
                onClick={() => {
                   setTitle("");
                  setEditResumeId("");
                }}
              />
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
