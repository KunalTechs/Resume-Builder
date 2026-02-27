import React from "react";
import {
  BriefcaseBusiness,
  Github,
  Globe,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  User,
} from "lucide-react";

const PersonalInfoForm = ({
  data = {},
  onChange, // This is the function from the parent
  removeBackground,
  setRemoveBackground,
}) => {
  
  // FIX 1: Rename this local function so it doesn't conflict with the state updater
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Call the parent's onChange function
    onChange({ ...data, image: file });

    // FIX 2: Clear input so the second upload of the same file works
    e.target.value = null;
  };

  // FIX 3: Standardize text input changes
  const handleTextChange = (key, value) => {
    onChange({ ...data, [key]: value });
  };

  const fields = [
    { key: "fullname", label: "Full Name", icon: User, type: "text", required: true },
    { key: "email", label: "Email Address", icon: Mail, type: "email", required: true },
    { key: "phone", label: "Phone Number", icon: Phone, type: "tel", required: true },
    { key: "location", label: "Location", icon: MapPin, type: "text", required: true },
    { key: "profession", label: "Profession", icon: BriefcaseBusiness, type: "text", required: true },
    { key: "linkedin", label: "LinkedIn Profile", icon: Linkedin, type: "url", required: true },
    { key: "github", label: "GitHub Profile", icon: Github, type: "url", required: true },
    { key: "website", label: "Personal Website", icon: Globe, type: "url", required: true },
  ];

  return (
    <div>
      <h3 className="text-lg font-semibold text-white">Personal Information</h3>
      <p className="text-sm text-gray-500">
        Get started with your personal information
      </p>

      {/* Image upload section */}
      <div className="flex items-center gap-4 mt-3">
        <label className="cursor-pointer">
          {data.image ? (
            <img
              src={
                typeof data.image === "string"
                  ? data.image
                  : URL.createObjectURL(data.image)
              }
              alt="user"
              className="w-16 h-16 rounded-full border border-slate-200 object-cover ring-1 ring-slate-300 hover:opacity-80"
            />
          ) : (
            <div className="inline-flex items-center gap-2 text-slate-400 hover:text-slate-300">
              <User className="size-10 p-2.5 border rounded-full border-slate-700" />
              Upload Image
            </div>
          )}
          <input
            type="file"
            accept="image/jpeg, image/png, image/jpg"
            className="hidden"
            onChange={handleFileChange} // Use the specific file handler
          />
        </label>

        {/* ✅ Ensure this exact structure in PersonalInfoForm.jsx */}
{data.image && ( 
  <div className="flex flex-col gap-1">
    <p className="text-gray-400 text-sm">Remove Background</p>
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        className="sr-only peer"
        onChange={() => setRemoveBackground((prev) => !prev)}
        checked={removeBackground}
      />
      <div className="w-9 h-5 bg-slate-800 rounded-full peer peer-checked:bg-purple-600 transition-colors duration-200"></div>
      <span className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition-transform duration-200 ease-in-out peer-checked:translate-x-4"></span>
    </label>
  </div>
)}
      </div>

      {/* Input fields */}
      {fields.map((field) => {
        const Icon = field.icon;
        return (
          <div key={field.key} className="space-y-1 mt-5">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-400">
              <Icon className="size-4" />
              {field.label}
              {field.required && <span className="text-red-500">*</span>}
            </label>
            <input
              type={field.type}
              value={data[field.key] || ""}
              onChange={(e) => handleTextChange(field.key, e.target.value)}
              className="mt-1 w-full px-3 py-2 text-white bg-black border border-slate-700 rounded-lg focus:ring focus:ring-purple-500 focus:border-purple-500 outline-none transition-colors text-sm"
              placeholder={`Enter your ${field.label.toLowerCase()}`}
              required={field.required}
            />
          </div>
        );
      })}
    </div>
  );
};

export default PersonalInfoForm;
