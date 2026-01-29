import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    public: {
      type: Boolean,
      default: false,
    },
    template: {
      type: String,
      default: "modern",
    },
    // CHANGED: accentColor -> accent_color
    accent_color: {
      type: String,
      default: "#000000",
    },
    // CHANGED: personalInfo -> personal_info
    // Update this block in your models/resumeModel.js
    personal_info: {
      image: { type: String, default: "" },
      fullname: { type: String, default: "" },
      email: { type: String, default: "" },
      phone: { type: String, default: "" },
      location: { type: String, default: "" },    
      profession: { type: String, default: "" },  
      linkedin: { type: String, default: "" },    
      github: { type: String, default: "" },      
      website: { type: String, default: "" },     
    },
    // MATCHED: professional_summary
    professional_summary: {
       type: String, default: "" 
    },

    experience: [
      {
        company: { type: String, default: "" },
        position: { type: String, default: "" },
        // CHANGED: startDate -> start_date
        start_date: { type: String, default: "" },
        // CHANGED: endDate -> end_date
        end_date: { type: String, default: "" },
        // CHANGED: isCurrent -> is_current
        is_current: { type: Boolean, default: false },
        description: { type: String, default: "" },
      },
    ],

    education: [
      {
        institution: { type: String, default: "" },
        degree: { type: String, default: "" },
        // CHANGED: fieldOfStudy -> field (matches your form)
        field: { type: String, default: "" },
        // CHANGED: startDate -> start_date
        start_date: { type: String, default: "" },
        // CHANGED: endDate -> end_date
        end_date: { type: String, default: "" },
        gpa: { type: String, default: "" },
        description: { type: String, default: "" },
      },
    ],

    // CHANGED: projects -> project (Matches your singular state)
    project: [
      {
        name: { type: String, default: "" },
        link: { type: String, default: "" },
        description: { type: String, default: "" },
      },
    ],

    // CHANGED: skills now simple array of strings if that's how your form works
    // If your form uses objects {name: ""}, keep it as an array of objects
    skills: [{ type: String, default: "" }], 

    certifications: [
      {
        title: { type: String, default: "" },
        issuer: { type: String, default: "" },
        date: { type: String, default: "" },
        description: { type: String, default: "" },
      },
    ],
  },
  { timestamps: true }
);

const Resume = mongoose.model("Resume", resumeSchema);
export default Resume;