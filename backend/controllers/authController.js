import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// GENERATE JWT TOKEN
const generateToken = (user) =>{
    return jwt.sign({ id:userId},process.env.JWT_SECRET,{ expiresIn: 'Id'})
}

// REGISTER USER
export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;  
        // CHECK IF USER ALREADY EXISTS   
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        } 
        if (password.length < 8) {
            return res.status(400).json({ message: 'Password must be at least 8 characters long' });
        } 
        // HASH PASSWORD
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, 10);

        // CREATE NEW USER
        const user = new User({ name, email, password:hashedPassword });
        await user.save();
        res.status(201).json({ _id : user._id, name: user.name, email: user.email, token: generateToken(user._id)   });

        // ERROR HANDLING
    } catch (error) {
        res.status(500).json({ message: 'Server error',error: error.message });
    }
};

// LOGIN USER
export const login = async (req, res) => {
    try {
        const {email,password} = req.body;
        // CHECK IF USER EXISTS OR EMAIL IS CORRECT
        const user = await User.findOne({ email });
        if(!user){
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // CHECK IF PASSWORD IS CORRECT
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(500).json({ message: 'Invalid email or password' });

        }

        res.status(200).json({ _id : user._id, name: user.name, email: user.email, token: generateToken(user._id)   });

        // ERROR HANDLING
    } catch (error) {
        res.status(500).json({ message: 'Server error',error: error.message });
    }       
};