import express from 'express';
import Submission from '../models/Submission.js';
import { verifyToken } from '../middleware/authmiddleware.js';

const router = express.Router();

router.get('/',verifyToken , async (req,res) => {
    try{
        const userId = req.user.id;
        const submissions = await Submission.find({ user: req.user.id }).populate('problemId') .sort({ createdAt: -1 });

        res.status(200).json(submissions);
    }catch(err){
        res.status(500).json({message: 'Failed to fetch submisison'});
    }
});

// GET /api/submissions/status/:contestId/:userId
// Returns a map: { [problemId]: "Accepted" | "Wrong" }

router.get('/status/:contestId',verifyToken, async (req, res) => {
    const { contestId } = req.params;
    const userId = req.user._id;
    try {
        const submissions = await Submission.find({ 
            contestId, 
            userId 
        });

        const statusMap = {};

        submissions.forEach(sub => {
            const currentStatus = statusMap[sub.problemId];
            if (sub.status === 'Accepted') {
                statusMap[sub.problemId] = 'Accepted'; // Highest priority
            } else if (!currentStatus) {
                statusMap[sub.problemId] = 'Wrong';
            }
        });

        res.json(statusMap);
    } catch (err) {
        res.status(500).json({ message: "Error fetching status", error: err.message });
    }
});

// routes/submissions.js
router.get('/status', verifyToken, async (req, res) => {
  const userId = req.user._id;
  try {
     const userId = req.user.id;

    // Fetch all submissions by the user
    const submissions = await Submission.find({ user: userId });

    // Initialize a map to store the latest verdict for each problem
    const statusMap = {};

    // Go through submissions and pick the latest one for each problem
    for (const sub of submissions) {
      const problemId = sub.problemId.toString(); // Make sure it's string
      if (!statusMap[problemId] || new Date(sub.createdAt) > new Date(statusMap[problemId].createdAt)) {
        statusMap[problemId] = {
          verdict: sub.verdict,
          createdAt: sub.createdAt,
        };
      }
    }
   /* const submissions = await Submission.find({ user: userId })
      .select('problemId verdict');

    const statusMap = {};
    console.log("All Submissions for user:");
    submissions.forEach(sub => {
      console.log(`Problem: ${sub.problemId}, Verdict: ${sub.verdict}`);
      const problemId = sub.problemId.toString();
      const verdict = sub.verdict;

    
      if (verdict === "Accepted") {
        statusMap[problemId] = "Accepted";
      } else {
        
        if (!statusMap[problemId]) {
          statusMap[problemId] = "Wrong";
        }
      }
    }); */
    console.log("Status Map:", statusMap);

    res.json(statusMap);
    

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching status", error: err.message });
  }
});

export default router;