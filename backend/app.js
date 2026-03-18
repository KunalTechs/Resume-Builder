import express from 'express';  
import cookieParser from 'cookie-parser';
import 'dotenv/config';
import { connectDB } from './config/db.js';
import userRoutes from './routes/authRoutes.js';  
import resumeRouter from './routes/resumeRouter.js';  
import aiRouter from './routes/aiRoutes.js';
import cors from "cors";

const app = express();



const allowedOrigins = [
  "https://resume-builder-3tp2.vercel.app", 
  "http://localhost:5173",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (Postman, mobile apps)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("CORS not allowed"));
      }
    },
    credentials: true,
  })
);

// 2. PARSERS & DB
app.use(express.json());
app.use(cookieParser());
connectDB();

// 3. ROUTES
app.use('/api/users', userRoutes);
app.use('/api/resumes', resumeRouter);
app.use('/api/ai', aiRouter); 

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Server is live!');
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});