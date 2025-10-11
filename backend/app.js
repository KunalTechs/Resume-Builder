import express from 'express';  
import cors from 'cors';
import cookieParser from 'cookie-parser';
import 'dotenv/config';
import { connectDB } from './config/db.js';
import userRoutes from './routes/authRoutes.js';        


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

const PORT = 3000;

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(PORT, () =>{
    console.log(`Server running on adress http://localhost:${PORT}`);
})
