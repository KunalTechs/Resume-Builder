import Resume from "../models/resumeModel.js";
import ai from "../config/ai.js";

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
          content: `You are an expert in resume writing.
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
    const { resumeText, title } = req.body;
    const userId = req.user.id;

    if (!resumeText) {
      return res.status(400).json({ message: "No resume text provided" });
    }

    const response = await ai.chat.completions.create({
      model: process.env.OpenAI_MODEL_NAME || "gpt-4-turbo-preview",
      messages: [
        {
          role: "system",
          content: `You are a Document Layout Expert. You will receive raw text from a resume (which may be jumbled from multi-column layouts). 
    
    ### Task:
    1. Logically re-order text so headers and body text are correctly associated.
    2. Extract all data into the EXACT JSON format specified below.
    3. If a section is missing, return an empty string, empty array, or false as per the default values.

    ### Target JSON Schema:
    {
      "personal_info": {
        "fullname": "Extract name",
        "email": "Extract email",
        "phone": "Extract phone",
        "location": "City, State/Country",
        "profession": "Job title",
        "linkedin": "Full URL",
        "github": "Full URL",
        "website": "Full URL",
        "image": ""
      },
      "professional_summary": "Extracted summary",
      "experience": [
        {
          "company": "",
          "position": "Job title",
          "start_date": "MMM YYYY",
          "end_date": "MMM YYYY or 'Present'",
          "is_current": true/false,
          "description": "Bullet points"
        }
      ],
      "education": [
        {
          "institution": "",
          "degree": "",
          "field": "Field of study",
          "start_date": "",
          "end_date": "",
          "gpa": "",
          "description": ""
        }
      ],
      "project": [
        {
          "name": "Project title",
          "link": "URL if available",
          "description": ""
        }
      ],
      "skills": ["List", "of", "strings"],
      "certifications": [
        {
          "title": "",
          "issuer": "",
          "date": "",
          "description": ""
        }
      ]
    }`,
        },
        {
          role: "user",
          content: `Parse this resume text: ${resumeText}`,
        },
      ],
      response_format: { type: "json_object" },
    });

    const extractedData = response.choices[0].message.content;
    const parsedData = JSON.parse(extractedData);

    // Save to MongoDB
    const newResume = await Resume.create({
      user: userId,
      title,
      ...parsedData,
    });

    res.status(200).json({ resumeId: newResume._id });
  } catch (error) {
    console.error("Upload Error:", error);
    res
      .status(500)
      .json({ message: "Failed to process resume", error: error.message });
  }
};
