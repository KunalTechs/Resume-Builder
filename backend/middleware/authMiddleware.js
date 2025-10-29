import User from "../models/user.js";
import jwt from "jsonwebtoken";

export const protect = async (req, res, next) => {
  try {
    let token;

    // Accept token from header or cookie
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ")
    ) {
      token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies.jwt) {
      token = req.cookies.jwt;
    }

    if (!token) {
      return res
        .status(401)
        .json({ message: "Not authorized, no token found" });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");

    next();
  } catch (error) {
    console.error("Protect middleware error:", error.message);
    res.status(401).json({ message: "Token failed", error: error.message });
  }
};

export default protect;
