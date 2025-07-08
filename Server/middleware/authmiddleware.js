import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const verifyToken= (req, res, next) => {
    const token = req.cookies.token;
    if(!token) return res.status(401).json({ message: 'Unauthorized' });

    try {
        const decoded = jwt.verify (token,process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};

export const isAdmin = async (req, res, next) => {
    try {
    console.log("req.user in isAdmin:", req.user); // 🟡 Add this

    const user = await User.findById(req.user.id); // 🔴 This line is likely causing the error
    console.log("User found:", user); // 🟡 Add this

    if (user && user.role === 'admin') {
      next();
    } else {
      return res.status(403).json({ message: 'Access denied: Admins only' });
    }
  } catch (error) {
    console.error("❌ Error in isAdmin:", error); // 🔴 Add this to see the exact crash
    return res.status(500).json({ message: 'Server error in isAdmin' });
  }
};