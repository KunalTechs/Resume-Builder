import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Resume from "../models/resumeModel.js"

// GENERATE JWT TOKEN
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

// REGISTER USER
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // CHECK IF USER ALREADY EXISTS
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    if (password.length < 8) {
      return res
        .status(400)
        .json({ message: "Password must be at least 8 characters long" });
    }
    // HASH PASSWORD
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // CREATE NEW USER
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = generateToken(newUser._id);

    // Set JWT in HTTP-only cookieParser
    res.cookie("jwt", token, {
      httpOnly: true, // can't be accessed via JS
      secure: process.env.NODE_ENV === "production", // only HTTPS in production
      sameSite: "Lax", // prevent CSRF
      maxAge: 3600000,
    }); // 1 hour

    res.status(200).json({
      message: "Registered successfully",
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
    });

    // ERROR HANDLING
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// LOGIN USER
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // CHECK IF USER EXISTS OR EMAIL IS CORRECT
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // CHECK IF PASSWORD IS CORRECT
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = generateToken(user._id);

    //Set JWT in HTTP-only cookieParser
    res.cookie("jwt", token, {
      httpOnly: true, // can't be accessed via JS
      secure: process.env.NODE_ENV === "production", // only HTTPS in production
      sameSite: "Lax", // prevent CSRF
      maxAge: 3600000,
    }); // 1 hour

     res.status(200).json({
      message: "Login successful",
      _id: user._id,
      name: user.name,
      email: user.email,
      
    });

    // ERROR HANDLING
  } catch (error) {
    res.status(400).json({ message: "Server error", error: error.message });
  }
};


// GET USER PROFILE
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// LOGOUT USER
export const logout = async (req, res) => {
  try {
    res.cookie("jwt", "", {
      httpOnly: true,
      expires: new Date(0), // Set expiration to a past date to delete it immediately
      sameSite: "Lax",
      secure: process.env.NODE_ENV === "production",
    });

    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


export const getUserResumes = async (req, res) => {
  try {
    // req.user.id comes from your 'protect' middleware
    const resumes = await Resume.find({ user: req.user.id });

    res.status(200).json({
      success: true,
      resumes,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch resumes",
      error: error.message
    });
  }
};
