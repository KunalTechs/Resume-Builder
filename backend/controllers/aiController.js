import Resume from "../models/resumeModel.js";
import  ai  from "../config/ai.js";

// controller for enchancing resume's professional summary using AI

export const enhanceProfessionalSummary = async (req, res) => {
  try {
    const { userContent } = req.body;

    if (!userContent) {
      return res.status(400).json({ message: "userContent is required" });
    }

    const responese = await ai.chat.completions.create({
      model: process.env.OpenAI_MODEL_NAME,
      messages: [
        {
          role: "system",
          content:
            `You are an expert in resume writing.
             Your task is to enchance the professsional summary of a resume. The summary 
             should be 1-2 sentences also highlighting key skills,experience, and career objectives.
              Make it comelling and ATS-friendly. and only return text no option or anything else.`,
        },
        {
          role: "user",
          content: userContent,
        },
      ],
    });

    const enhancedSummary = responese.choices[0].message.content;
    return res.status(200).json({ enhancedSummary });
  } catch (error) {
    res.status(400).json({
      message: "failed to enhance professional summary",
      error: error.message,
    });
  }
};


// controller for enchancing a resume's job description using AI

export const enhanceJobDescription = async (req, res) => {
  try {
    const { userContent } = req.body;

    if (!userContent) {
      return res.status(400).json({ message: "userContent is required" });
    }

    const responese = await ai.chat.completions.create({
      model: process.env.OpenAI_MODEL_NAME,
      messages: [
        {
          role: "system",
          content: ` You are an expert in resume writing.
          Your task is to enchance the job description of a resume. The description 
          should be 2-3 sentences also highlighting key skills,achievements, and responsibilities.
           Make it comelling and ATS-friendly. and only return text no option or anything else.`,
        },
        {
          role: "user",
          content: userContent,
        },
      ],
    });

    const enhancedContent = responese.choices[0].message.content;
    return res.status(200).json({ enhancedContent });
  } catch (error) {
    res.status(400).json({
      message: "failed to enhance professional summary",
      error: error.message,
    });
  }
};

// controller for uploading resume to database

export const uploadResume = async (req, res) => {
  try {
    const {resumeText, title } = req.body;
    const userId = req.user.id;

    if (!resumeText) {
        return res.status(400).json({ message: "Missing required fields" });

    }
    const systemPrompt = " Your are en expert AI Agent to extract data from resume."
    
    const userPrompt = ` Extract the following details from the resume: ${resumeText}
    
    provide the data in JSON format with following keys:

    {
    personalInfo: {
    image: { type: String, default: '' },
    fullname: { type: String, default: '' },
    email: { type: String, default: '' },
    phone: { type: String, default: '' }
  },

  education: [{
    institution: { type: String, default: '' },
    degree: { type: String, default: '' },
    fieldofStudy: { type: String, default: '' },
    StartDate: { type: String, default: '' },
    endDate: { type: String, default: '' },
    gpa: { type: String, default: '' },
    description: { type: String, default: '' }
  }],

  skills: [{ name: { type: String, default: '' } }],
  projects: [{ title: { type: String, default: '' }, link: { type: String, default: '' }, description: { type: String, default: '' } }],
  certifications: [{ title: { type: String, default: '' }, issuer: { type: String, default: '' }, date: { type: String, default: '' }, description: { type: String, default: '' } }],
  languages: [{ name: { type: String, default: '' }, proficiency: { type: String, default: '' } }],
  hobbies: [{ name: { type: String, default: '' } }],
  references: [{ name: { type: String, default: '' }, contactInfo: { type: String, default: '' }, relationship: { type: String, default: '' } }]}
    
    `

    const responese = await ai.chat.completions.create({
      model: process.env.OpenAI_MODEL_NAME,
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: "user",
          content: userPrompt,
        },
      ],
      resonse_format: {
        type: "json",
  }
  });

    const extractedData = responese.choices[0].message.content;
    const parsedData = JSON.parse(extractedData);
    const newResume = new Resume.create({
      userId,
      title,
      ...parsedData,
    });
    res.status(200).json({ resumeId: newResume._id });
  } catch (error) {
    res.status(400).json({
      message: "failed to enhance professional summary",
      error: error.message,
    });
  }
};
