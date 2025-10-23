import express from 'express';  
import cors from 'cors';
import cookieParser from 'cookie-parser';
import 'dotenv/config';
import { connectDB } from './config/db.js';
import userRoutes from './routes/authRoutes.js'; 


import path from 'path';
import { fileURLToPath } from 'url';  
import resumeRouter from './routes/resumeRouter.js';  

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app = express();
app.use(cors());

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

app.use('/uploads', express.static(path.join(__dirname, '/uploads'), {
    setHeaders: (res, path) => {
        res.set('Access-Control-Allow-Origin', 'http://localhost:5173');
}}));

const PORT = 3000;

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(PORT, () =>{
    console.log(`Server running on adress http://localhost:${PORT}`);
})
