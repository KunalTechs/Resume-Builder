import express from 'express';
import {protect} from '../middleware/authMiddleware.js';
import { createResume, getAllResumes, getResumeById, updateResume, deleteResume, } from '../controllers/resumeController.js'
import { uploadResumeImages } from '../controllers/uploadImages.js';
import  upload  from '../middleware/uploadMiddleware.js';   

const resumeRouter = express.Router();

resumeRouter.route('/').post(protect, createResume).get(protect, getAllResumes);
resumeRouter.route('/:id').get(protect, getResumeById).put(protect, updateResume).delete(protect, deleteResume);
resumeRouter.route('/:id/upload-images').post(protect, uploadResumeImages);

export default resumeRouter;

// Note: uploadResumeImages middleware should be defined and imported if used in the route above.