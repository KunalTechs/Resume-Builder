
import ik from "../config/ikConfig.js";
import Resume from "../models/resumeModel.js";
import fs from "fs";
import path from "path";
import mongoose from "mongoose";

// CREATE FUNCTION

export const createResume = async (req, res) => {
  try {
    const userId = req.user.id;
    const { title } = req.body;

   
    const newResume = new Resume({
      user: userId, 
      title,
    });

    // 🔥 SAVE to MongoDB
    await newResume.save();

    res.status(201).json({ 
      message: "Resume created successfully", 
      resume: newResume 
    });
  } catch (error) {
    console.error("Create Resume Error:", error);
    res.status(500).json({ 
      message: "Failed to create resume", 
      error: error.message 
    });
  }
};

// GET ALL RESUMES FOR LOGGED IN USER
export const getAllResumes = async (req, res) => {
  try {
    const userId = req.user.id;
    // Find resumes where 'user' matches the logged-in ID
    const resumes = await Resume.find({ user: userId }).sort({ updatedAt: -1 });
    
    res.status(200).json(resumes);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch resumes", error: error.message });
  }
};

//GET RESUME BY ID
export const getResumeById = async (req, res) => {
  try {
    // 1.Checkauth middleware
   const userId = req.user.id;
    const resumeId = req.params.id;

    // 2. Query the DB
    const resume = await Resume.findOne({ user: userId, _id: resumeId });

    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    // 3. FIX: Convert to plain object to clean up fields properly
    const resumeObj = resume.toObject();
    delete resumeObj.__v;
    delete resumeObj.createdAt;
    delete resumeObj.updatedAt;

    return res.status(200).json(resumeObj);
  } catch (error) {
    res.status(500).json({ 
      message: "Failed to get resume by id", 
      error: error.message 
    });
  }
};
// UPDATE FUNCTION
export const updateResume = async (req, res) => {
  try {
    const { resumeId, resumeData, removeBackground } = req.body;
    const imageFile = req.file; // Provided by Multer

    // 1. Parse the JSON data
    let resumeDataCopy = JSON.parse(resumeData);

    // 2. Prepare the Dot Notation update object (Prevents attribute deletion)
    const updateObject = {};

    // Map all fields except personal_info (standard mapping)
    Object.keys(resumeDataCopy).forEach((key) => {
      if (key !== "personal_info") {
        updateObject[key] = resumeDataCopy[key];
      }
    });

    // Map personal_info fields EXCEPT image to dot notation
    if (resumeDataCopy.personal_info) {
      Object.keys(resumeDataCopy.personal_info).forEach((key) => {
        if (key !== "image") {
          updateObject[`personal_info.${key}`] = resumeDataCopy.personal_info[key];
        }
      });
    }

   
    

// Inside updateResume controller
if (imageFile) {
    const fileContent = fs.readFileSync(imageFile.path, { encoding: 'base64' });
    const uploadMethod = ik.upload ? ik.upload.bind(ik) : ik.files.upload.bind(ik.files);

    const uploadOptions = {
        file: fileContent,
        fileName: `resume_${resumeId}_${Date.now()}.png`,
        folder: "resumes",
    };

    // Use a string check for the boolean flag
   if (String(removeBackground) === "true") {
    console.log("✂️ Attempting Background Removal...");
    uploadOptions.extensions = [
        {
            // ✅ 'google-segmentation' is more reliable for transparency
            name: "google-segmentation", 
            options: {
                // ✅ Set bg_color to transparent so your accentColor works
                bg_color: "transparent",
                // ✅ Remove add_shadow if it's causing a white border/glow
                add_shadow: false 
            }
        }
    ];
}

    try {
        const uploadResponse = await uploadMethod(uploadOptions);
        console.log("✅ ImageKit Response:", uploadResponse.url);
        
        // Check if extension actually ran
        if (uploadResponse.extensionStatus) {
            console.log("Extension Status:", uploadResponse.extensionStatus);
        }

        updateObject["personal_info.image"] = uploadResponse.url;
    } catch (uploadError) {
        console.error("❌ ImageKit Extension Error:", uploadError.message);
        // FALLBACK: If extension fails, upload without it so the user doesn't lose data
        delete uploadOptions.extensions;
        const fallbackResponse = await uploadMethod(uploadOptions);
        updateObject["personal_info.image"] = fallbackResponse.url;
        console.log("⚠️ Uploaded original image as fallback.");
    }

    fs.unlinkSync(imageFile.path); 
}
    // 4. Update the DB
    const updated = await Resume.findOneAndUpdate(
      { _id: resumeId },
      { $set: updateObject }, // $set is crucial
      { new: true }
    );

    res.json({ success: true, resume: updated });
  } catch (error) {
    console.error("Backend Error:", error.message);
    res.status(500).json({ message: "Update failed", error: error.message });
  }
};

// DELETE FUNCTION
export const deleteResume = async (req, res) => {
  try {
    const userId = req.user.id;
    const resumeId = req.params.id;

    // DELETE THE RESUME
    const deleteResumes = await Resume.findOneAndDelete({
     user:userId,
      _id: resumeId,
    });
    if (!deleteResumes) {
      return res
        .status(404)
        .json({ message: "Resume not found or not authorized" });
    }
    res.json({ message: "Resume deleted successfully", deleteResumes });
  } catch (error) {
    res
      .status(500)
      .json({ message: "failed to delete resume", error: error.message });
  }
};

//get resume by public id
export const getPublicResumeById = async (req, res) => {
  try {
    const resumeId = req.params.id;
    const resume = await Resume.findOne({ _id: resumeId, public: true });

    if (!resume) {
      return res
        .status(404)
        .json({ message: "Resume not found or not public" });
    }
    return res.status(200).json(resume);
  } catch (error) {
    res.status(500).json({
      message: "failed to get public resume by id",
      error: error.message,
    });
  }
};
