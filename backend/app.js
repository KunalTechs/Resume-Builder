import express from 'express';  
import cookieParser from 'cookie-parser';
import 'dotenv/config';
import { connectDB } from './config/db.js';
import userRoutes from './routes/authRoutes.js';  
import resumeRouter from './routes/resumeRouter.js';  
import aiRouter from './routes/aiRoutes.js';



const app = express();
app.use((req, res, next) => {
  const origin = req.headers.origin;
  
  // Directly allow your frontend URL
  if (origin === 'https://daring-youthfulness-production.up.railway.app') {
    res.setHeader('Access-Control-Allow-Origin', origin);
  } else if (process.env.FRONTEND_URL && origin === process.env.FRONTEND_URL.replace(/\/$/, "")) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }

  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Set-Cookie');

  // Handle the Preflight (OPTIONS) request immediately
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
