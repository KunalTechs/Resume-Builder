import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../config/api";
import {
  Briefcase,
  FileText,
  Sparkles,
  User,
  GraduationCap,
  Folder,
  ChevronLeft,
  ChevronRight,
  Share2Icon,
  EyeIcon,
  EyeOffIcon,
  DownloadIcon,
  ArrowLeftIcon,
} from "lucide-react";
import PersonalInfoForm from "../components/PersonalInfoForm";
import ResumePreview from "../components/ResumePreview";
import TemplateSelector from "../components/TemplateSelector";
import ColorPicker from "../components/ColorPicker";
import ProffessionalSummary from "../components/ProffessionalSummary";
import ExperienceForm from "../components/ExperienceForm";
import EducationForm from "../components/EducationForm";
import ProjectForm from "../components/ProjectForm";
import SkillsForm from "../components/SkillsForm";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

const ResumeBuilder = () => {
  const { resumeId } = useParams();
  const { token } = useSelector((state) => state.auth);

  const [resumeData, setResumeData] = useState({
    _id: "",
    title: "",
    personal_info: {
      image: "",
      fullname: "",
      email: "",
      phone: "",
      location: "",
      profession: "",
      linkedin: "",
      github: "",
      website: "",
    },
    professional_summary: " ",
    experience: [],
    education: [],
    project: [],
    skills: [],
    template: "classic",
    accent_color: "#4F46E5",
    public: false,
  });

  const [isLoading, setIsLoading] = useState(true);

  const loadExistingResume = async () => {
    try {
      // 1. Fetch the data
      const { data } = await api.get("/api/resumes/get/" + resumeId);

      if (data) {
        console.log("Resume data fetched successfully:", data);

        // 2. Set the state with safe defaults
        // This prevents the "Preview" from crashing if a section is empty in the DB
        setResumeData({
          ...data,
          personal_info: data.personal_info || {
            fullname: "",
            email: "",
            phone: "",
            location: "",
          },
          experience: data.experience || [],
          education: data.education || [],
          project: data.project || [],
          skills: data.skills || [],
        });

        // 3.Update the browser tab title to the resume title
        if (data.title) {
          document.title = `${data.title} | Resume Builder`;
        }
      }
    } catch (error) {
      console.error("Load Error:", error.message);
      toast.error("Could not load your resume. Please try again.");
    }
  };

  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [removeBackground, setRemovebackground] = useState(false);

  const sections = [
    { id: "personal", name: "personal Info", icon: User },
    { id: "summary", name: "Summary", icon: FileText },
    { id: "experience", name: "Experience", icon: Briefcase },
    { id: "education", name: "Education", icon: GraduationCap },
    { id: "project", name: "Projects", icon: Folder },
    { id: "skills", name: "Skills", icon: Sparkles },
  ];
  const activeSection = sections[activeSectionIndex];

  useEffect(() => {
    if (resumeId) {
      loadExistingResume();
    }
  }, [resumeId]);

  // Public and Private resume visiblity
  const changeResumeVisibility = async () => {
    try {
      const newVisibility = !resumeData.public;

      const formData = new FormData();
      formData.append("resumeId", resumeId);
      formData.append("resumeData", JSON.stringify({ public: newVisibility }));

      const { data } = await api.put("/api/resumes/update", formData, {
        headers: { "Content-Type": "multipart/form-data" }, // ✅ add this
      });

      setResumeData((prev) => ({ ...prev, public: newVisibility }));
      toast.success(`Resume is now ${newVisibility ? "Public" : "Private"}`);
    } catch (error) {
      toast.error("Failed to update visibility");
      console.error(error);
    }
  };

  // for share the resume
  const handleShare = () => {
    const frontendUrl = window.location.href.split("/app/")[0];
    const resumeUrl = frontendUrl + "/view/" + resumeId;

    if (navigator.share) {
      navigator.share({ url: resumeUrl, text: "My Resume" });
    } else {
      alert("Share not supported on this browser. ");
    }
  };

  // for downloadResume
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

  const saveResume = async () => {
    try {
      const formData = new FormData();
      formData.append("resumeId", resumeId);

      formData.append("removeBackground", String(removeBackground));

      // 1. Create a clean copy of data for the JSON string
      const dataToSend = JSON.parse(JSON.stringify(resumeData));

      // 2. Handle the Image File
      if (resumeData.personal_info?.image instanceof File) {
        formData.append("image", resumeData.personal_info.image);
        // Remove from JSON so we don't send a binary object in a string
        if (dataToSend.personal_info) delete dataToSend.personal_info.image;
      }

      formData.append("resumeData", JSON.stringify(dataToSend));

      // 3. THE API CALL
      const response = await api.put("/api/resumes/update", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // 4. CRITICAL: Update state with the SERVER'S data
      if (response.data?.resume) {
        // This 'resume' object from the server now has the real ImageKit URL
        setResumeData(response.data.resume);
        toast.success("Saved to Database!");
      }
    } catch (error) {
      console.error("Save Error:", error);
      toast.error("Save failed");
    }
  };

  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 py-6">
        <Link
          to="/app"
          className="inline-flex gap-2  items-center justify-center text-slate-400 hover:text-slate-700 transition-all"
        >
          <ArrowLeftIcon className="size-4 " /> Back to Dashbaord
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-8">
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Left Panel - Form */}
          <div className="relative lg:col-span-5 rounded-lg overflow-hidden">
            <div className="relative bg-black rounded-lg shadow-sm border border-gray-200 p-6 pt-1">
              {/* Progress bar background */}
              <hr className="absolute top-0 left-0 right-0 h-1 bg-gray-200 rounded-full" />

              {/* Progress bar active section */}
              <hr
                className="absolute top-0 left-0 h-1 bg-gradient-to-r from-red-500 to-red-600 rounded-full transition-all duration-1000"
                style={{
                  width: `${
                    (activeSectionIndex / (sections.length - 1)) * 100
                  }%`,
                }}
              />

              {/* Section Navigation */}
              <div className="flex justify-between items-center mb-6 border-b border-gray-300 py-1">
                {/* buttons for template select and change color of resume */}
                <div className="flex items-center gap-3 mb-6 border-b border-gray-300 py-2">
                  <TemplateSelector
                    selectedTemplate={resumeData.template}
                    onChange={(template) =>
                      setResumeData((prev) => ({ ...prev, template }))
                    }
                  />

                  <ColorPicker
                    selectedColor={resumeData.accent_color}
                    onChange={(color) =>
                      setResumeData((prev) => ({
                        ...prev,
                        accent_color: color,
                      }))
                    }
                  />
                </div>

                <div className="flex items-center">
                  {activeSectionIndex !== 0 && (
                    <button
                      onClick={() =>
                        setActiveSectionIndex((prevIndex) =>
                          Math.max(prevIndex - 1, 0),
                        )
                      }
                      className="flex items-center justify-center gap-1 p-3 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all "
                    >
                      <ChevronLeft className="size-4" /> Previous
                    </button>
                  )}
                  <button
                    onClick={() =>
                      setActiveSectionIndex((prevIndex) =>
                        Math.min(prevIndex + 1, sections.length - 1),
                      )
                    }
                    className={`flex items-center gap-1 p-3 rounded-lg text-sm font-medium text-gray-600  hover:bg-gray-100 transition-all ${
                      activeSectionIndex === sections.length - 1 &&
                      "opacity-50 cursor cursor-not-allowed"
                    }`}
                    disabled={activeSectionIndex === sections.length - 1}
                  >
                    Next <ChevronRight className="size-4" />
                  </button>
                </div>
              </div>

              {/* Form content */}
              <div className="space-y-6">
                {activeSection.id === "personal" && (
                  <PersonalInfoForm
                    data={resumeData.personal_info}
                    onChange={(data) =>
                      setResumeData((prev) => ({
                        ...prev,
                        personal_info: data,
                      }))
                    }
                    removeBackground={removeBackground}
                    setRemoveBackground={setRemovebackground}
                  />
                )}
                {activeSection.id === "summary" && (
                  <ProffessionalSummary
                    data={resumeData.professional_summary}
                    onChange={(data) =>
                      setResumeData((prev) => ({
                        ...prev,
                        professional_summary: data,
                      }))
                    }
                    setResumeData={setResumeData}
                  />
                )}
                {activeSection.id === "experience" && (
                  <ExperienceForm
                    data={resumeData.experience}
                    onChange={(data) =>
                      setResumeData((prev) => ({
                        ...prev,
                        experience: data,
                      }))
                    }
                  />
                )}
                {activeSection.id === "education" && (
                  <EducationForm
                    data={resumeData.education}
                    onChange={(data) =>
                      setResumeData((prev) => ({
                        ...prev,
                        education: data,
                      }))
                    }
                  />
                )}
                {activeSection.id === "project" && (
                  <ProjectForm
                    data={resumeData.project}
                    onChange={(data) =>
                      setResumeData((prev) => ({
                        ...prev,
                        project: data,
                      }))
                    }
                  />
                )}
                {activeSection.id === "skills" && (
                  <SkillsForm
                    data={resumeData.skills}
                    onChange={(data) =>
                      setResumeData((prev) => ({
                        ...prev,
                        skills: data,
                      }))
                    }
                  />
                )}
              </div>
              <button
                onClick={() => {
                  toast.promise(saveResume, { loading: "Saving..." });
                }}
                className="bg-gradient-to-br from-red-100 to-red-200 ring-red-300 text-red-600 ring hover:ring-red-400 transition-all rounded-md px-6 py-2 mt-6 text-sm"
              >
                Save Changes
              </button>
            </div>
          </div>

          {/* Right Panel - Preview */}
          <div className="lg:col-span-7 max-lg:mt-6">
            <div className="relative w-full">
              <div className="absolute bottom-3 left-0 right-0 flex items-center justify-end gap-2 z-10">
                {resumeData.public && (
                  <button
                    onClick={handleShare}
                    className="flex items-center p-2 px-4 gap-2 text-xs bg-gradient-to-br from-blue-100 to-blue-200 text-blue-600 rounded-lg ring-blue-300 hover:ring-transition-colors"
                  >
                    <Share2Icon className="size-4" />
                    Share
                  </button>
                )}
                <button
                  onClick={changeResumeVisibility}
                  className="flex items-center p-2 px-4 gap-2 text-xs bg-gradient-to-br from-purple-100 to-purple-200 text-purple-600 rounded-lg ring-purple-300 hover:ring-transition-colors"
                >
                  {resumeData.public ? (
                    <EyeIcon className="size-4" />
                  ) : (
                    <EyeOffIcon className="size-4" />
                  )}
                  {resumeData.public ? "public" : "Private"}
                </button>
                <button
                  onClick={downloadResume}
                  className="flex items-center p-2 px-4 gap-2 text-xs bg-gradient-to-br from-green-100 to-green-200 text-green-600 rounded-lg ring-1 ring-green-300 hover:ring-green-400 transition-all shadow-sm"
                >
                  <DownloadIcon className="size-4" />
                  Download
                </button>
              </div>
            </div>
          
          <div id="print-area">
          <div id="resume-preview">
            <ResumePreview
              data={resumeData}
              template={resumeData.template}
              accentColor={resumeData.accent_color}
              removeBackground={removeBackground}
            />
          </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;
