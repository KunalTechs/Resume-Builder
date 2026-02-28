import express from 'express';  
import cookieParser from 'cookie-parser';
import 'dotenv/config';
import { connectDB } from './config/db.js';
import userRoutes from './routes/authRoutes.js';  
import resumeRouter from './routes/resumeRouter.js';  
import aiRouter from './routes/aiRoutes.js';



const app = express();

app.use((req, res, next) => {
  // 1. Log the incoming request origin to the Railway console
  console.log("Incoming Request Origin:", req.headers.origin);

  // 2. Force the header to your specific frontend URL
  res.setHeader('Access-Control-Allow-Origin', 'https://daring-youthfulness-production.up.railway.app');
  
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Set-Cookie');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  next();
});

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
