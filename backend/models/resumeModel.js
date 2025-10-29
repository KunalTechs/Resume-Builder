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
    accentColor: {
      type: String,
      default: "#000000",
    },
    personalInfo: {
      image: { type: String, default: "" },
      fullname: { type: String, default: "" },
      email: { type: String, default: "" },
      phone: { type: String, default: "" },
    },

    education: [
      {
        institution: { type: String, default: "" },
        degree: { type: String, default: "" },
        fieldofStudy: { type: String, default: "" },
        StartDate: { type: String, default: "" },
        endDate: { type: String, default: "" },
        gpa: { type: String, default: "" },
        description: { type: String, default: "" },
      },
    ],

    skills: [{ name: { type: String, default: "" } }],
    projects: [
      {
        title: { type: String, default: "" },
        link: { type: String, default: "" },
        description: { type: String, default: "" },
      },
    ],
    certifications: [
      {
        title: { type: String, default: "" },
        issuer: { type: String, default: "" },
        date: { type: String, default: "" },
        description: { type: String, default: "" },
      },
    ],
    languages: [
      {
        name: { type: String, default: "" },
        proficiency: { type: String, default: "" },
      },
    ],
    hobbies: [{ name: { type: String, default: "" } }],
    references: [
      {
        name: { type: String, default: "" },
        contactInfo: { type: String, default: "" },
        relationship: { type: String, default: "" },
      },
    ],
  },
  { timestamps: true }
);

const Resume = mongoose.model("Resume", resumeSchema);
export default Resume;
