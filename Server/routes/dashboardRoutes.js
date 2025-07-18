import express from 'express';
import { verifyToken } from '../middleware/authmiddleware.js';
import Problems from '../models/Problems.js';
import Submission from '../models/Submission.js';

const router = express.Router();


router.get('/stats',verifyToken, async (req, res) => {
  

   console.log("Request received for /dashboard-stats");
  
  try {
    const userId = req.user.id;

    
    const totalProblems = await Problems.countDocuments();

  
    // Get all submissions for the user
const submissions = await Submission.find({ user: userId });

// Filter accepted ones
const acceptedSubs = submissions.filter(sub => sub.verdict === 'Accepted');

// Solved Count (unique problems)
const solvedProblemIds = new Set(acceptedSubs.map(sub => sub.problemId.toString()));
const solvedCount = solvedProblemIds.size;

// Heatmap: date => submission count
const heatmap = {};
submissions.forEach(sub => {
  const date = new Date(sub.timestamp).toISOString().split('T')[0];
  heatmap[date] = (heatmap[date] || 0) + 1;
});

// Streak calculation
const acceptedDates = new Set(acceptedSubs.map(sub => {
  const date = new Date(sub.timestamp);
  date.setHours(0, 0, 0, 0);
  return date.toISOString().split('T')[0];
}));

let streak = 0;
let currentDate = new Date();
currentDate.setHours(0, 0, 0, 0);
while (acceptedDates.has(currentDate.toISOString().split('T')[0])) {
  streak++;
  currentDate.setDate(currentDate.getDate() - 1);
}

    // Send response
    const responseData = {
      totalProblems,
      solvedCount,
      streak,
      heatmap,
       // optionally send if needed for frontend
    };

    console.log("Dashboard Stats:", responseData);
 

    res.status(200).json(responseData);
  } catch (err) {
    console.error(err);
    console.error("Error in /dashboard-stats:", err);
    res.status(500).json({ message: 'Failed to fetch dashboard stats' });
  }
});

export default router;

