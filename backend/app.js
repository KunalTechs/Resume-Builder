import express from 'express';  
import cors from 'cors';
import cookieParser from 'cookie-parser';
import 'dotenv/config';
import { connectDB } from './config/db.js';
import userRoutes from './routes/authRoutes.js';  
import resumeRouter from './routes/resumeRouter.js';  
import aiRouter from './routes/aiRoutes.js';



const app = express();
app.use(cors({
  origin: process.env.FRONTEND_URL, // <- your React dev server
  credentials: true,               // <- very important for cookies
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


const PORT = process.env.PORT;

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(PORT,'0.0.0.0', () =>{
    console.log(`Server running on adress http://localhost:${PORT}`);
})
