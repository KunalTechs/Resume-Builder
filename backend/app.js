import express from 'express';  
import cors from 'cors';
import cookieParser from 'cookie-parser';
import 'dotenv/config';
import { connectDB } from './config/db.js';
import userRoutes from './routes/authRoutes.js';  
import resumeRouter from './routes/resumeRouter.js';  
import aiRouter from './routes/aiRoutes.js';



const app = express();
const allowedOrigins = [
  'https://daring-youthfulness-production.up.railway.app', // Your specific frontend
  process.env.FRONTEND_URL // Your variable from Railway
].filter(Boolean); // Removes undefined if variable is missing

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
  exposedHeaders: ['set-cookie']
}));

app.use(express.json());

//Connected to database

connectDB();

//MIDDLEWARE
app.use(express.json());


// COOKIE PARSER
app.use(cookieParser());

// ROUTES
app.use('/api/users', userRoutes);
app.use('/api/resumes', resumeRouter);
app.use('/api/ai', aiRouter); 


const PORT = process.env.PORT || 3000 ;

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(PORT,'0.0.0.0', () =>{
    console.log(`Server running on adress http://localhost:${PORT}`);
})
