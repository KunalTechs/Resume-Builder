import User from "../models/user.js";
import jwt from "jsonwebtoken";

// AUTH MIDDLEWARE TO PROTECT ROUTES
export const protect = async (req,res,next) => {
    try{
    let token  =req.cookies.jwt || req.headers.authorization;
    if(token && token.startsWith('Bearer')){
        token = token.split(" ")[1];

        // DECODE TOKEN
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select('-password')
        next();
    } else {
        req.status(401).json({ meassage: 'Not authorized, no Token Found' });
    }
}
catch(error){
    res.status(401).json({message: 'Token failed', error: error.message});
}
}