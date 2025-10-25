import express from 'express';
import protect from '../middleware/authMiddleware.js';
import { enhanceProfessionalSummary, enhanceJobDescription, uploadResume  } from '../controllers/aiController.js';

const aiRouter = express.Router();


aiRouter.post('enchance-prof-sum',protect, enhanceProfessionalSummary);
aiRouter.post('/enhance-job-desc', protect, enhanceJobDescription);
aiRouter.post('/upload-resume', protect, uploadResume);

export default aiRouter;
