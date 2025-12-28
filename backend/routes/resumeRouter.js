import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  createResume,
  getAllResumes,
  getResumeById,
  updateResume,
  deleteResume,
  getPublicResumeById,
} from "../controllers/resumeController.js";
import upload from "../config/multer.js";
import { get } from "mongoose";

const resumeRouter = express.Router();

resumeRouter.route("/create").post(protect, createResume);
resumeRouter.get("/", protect, getAllResumes);
resumeRouter.put("/update", upload.single("image"), protect, updateResume);
resumeRouter.get("/get/:id", protect, getResumeById);
resumeRouter.delete("/delete/:id", protect, deleteResume);
resumeRouter.get("/public/:id", getPublicResumeById);

export default resumeRouter;
