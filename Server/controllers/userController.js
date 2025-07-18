import jwt from 'jsonwebtoken';
import User from '../models/User.js'; // adjust if your model path is different
import Submission from '../models/Submission.js'
import Problem from '../models/Problems.js'


export const getMe = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: 'Not authenticated' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Replace with your JWT secret
    const user = await User.findById(decoded.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json({ user:{
       firstname: user.firstname,
        lastname: user.lastname,
        role: user.role,
    } 
  });
  } catch (error) {
    console.error('error in /me route:',error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const getDashboardStats = async (req, res) => {
  try {
    const userId = req.user.id;

    // Get all submissions by user
    const submissions = await Submission.find({ user: userId });

    // Count total problems
    const totalProblems = await Problem.countDocuments();

    // Count how many were accepted
    const solvedCount = submissions.filter(s => s.verdict === 'Accepted').length;

    // Count all attempted (you already fetched all submissions)
    const attemptedCount = submissions.length;

    // Get user's bookmarks count
    const user = await User.findById(userId);
    const bookmarkedCount = user.bookmarks?.length || 0;

    // Streak data from user model
    const currentStreak = user.currentStreak || 0;
    const maxStreak = user.maxStreak || 0;

    // Send response
    res.json({
      totalProblems,
      solvedCount,
      attemptedCount,
      bookmarkedCount,
      currentStreak,
      maxStreak
    });

  } catch (err) {
    console.error("Dashboard stats error:", err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
