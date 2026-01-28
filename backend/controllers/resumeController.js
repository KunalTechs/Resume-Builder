import imagekit from "@imagekit/nodejs";
import Resume from "../models/resumeModel.js";
import fs from "fs";
import path from "path";
import mongoose from "mongoose";

// CREATE FUNCTION

export const createResume = async (req, res) => {
  try {
    const userId = req.user.id; // From your 'protect' middleware
    const { title } = req.body;

    // Use the field name 'user' as defined in your Schema
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
    // 1. FIX: Check your auth middleware. It usually sets req.user
   const userId = req.user._id;
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
    // 1. Check User ID
   const userId = req.user?._id || req.user?.id || req.userId;
    

    const { resumeId, resumeData, removeBackground } = req.body;
    const image = req.file;

    // 2. Safe Parsing (No await)
    let resumeDataCopy;
    try {
      resumeDataCopy = typeof resumeData === 'string' ? JSON.parse(resumeData) : resumeData;
      delete resumeDataCopy._id;
    } catch (e) {
      console.log("Debug: JSON Parse failed");
      return res.status(400).json({ message: "Invalid data format" });
    }

    

    // 3. Handle Image
    if (image) {
      console.log("Debug: Processing image upload...");
      const imageBufferData = fs.readFileSync(image.path); // More stable than createReadStream
      const response = await imagekit.Files.upload({
        file: imageBufferData,
        fileName: "resume.png",
        folder: "user-resumes",
      });

      // SAFE ASSIGNMENT: Ensure personal_info exists
      if (!resumeDataCopy.personalInfo) resumeDataCopy.personalInfo = {};
      resumeDataCopy.personalInfo.image = response.url;
      
      // Clean up temp file
      fs.unlinkSync(image.path);
    }

    // 4. The Database Call
    console.log("Debug: Attempting DB update for resumeId:", resumeId);

    if (resumeDataCopy.title === "") {
      delete resumeDataCopy.title; 
    }

    const updatedResume = await Resume.findOneAndUpdate(
      { user: userId, _id: resumeId },
      resumeDataCopy,
      { new: true, runValidators: true }
    );

    if (!updatedResume) {
      return res.status(404).json({ message: "Resume not found or not authorized" });
    }

    res.json({ message: "Updated!", resume: updatedResume });

  } catch (error) {
    // THIS IS THE MOST IMPORTANT LOG
    console.error("CRITICAL ERROR:", error.message); 
    res.status(500).json({ message: "failed to save resume", error: error.message });
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
