import express from 'express';
import {protect} from '../middleware/authMiddleware.js';
import { createResume, getAllResumes, getResumeById, updateResume, deleteResume } from '../controllers/resumeController.js'
import  upload  from '../middleware/uploadMiddleware.js';

const resumeRouter = express.Router();

resumeRouter.route('/').post(protect, createResume).get(protect, getAllResumes);
resumeRouter.route('/:id').get(protect, getResumeById).put(protect, updateResume).delete(protect, deleteResume);

export default resumeRouter;

// Note: uploadResumeImages middleware should be defined and imported if used in the route above.