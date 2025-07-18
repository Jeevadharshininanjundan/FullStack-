import express from 'express';
import axios from 'axios';
import {isAdmin,verifyToken} from '../middleware/authmiddleware.js';
import Contest from '../models/Contest.js';
import Problems from '../models/Problems.js';
import Submission from '../models/Submission.js';

const router = express.Router();

// Create a contest
router.post('/',verifyToken,isAdmin, async (req, res) => {
  try {
    const contest = new Contest(req.body);
    await contest.save();
    res.status(201).json(contest);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all contests
router.get('/', async (req, res) => {
  try {
    const contests = await Contest.find();
    res.json(contests);
  } catch (err) {
    console.error('error fetching the code',err);
    res.status(500).json({ error: err.message });
  }
});

// Get contest details
router.get('/:id', async (req, res) => {
  try {
    const contest = await Contest.findById(req.params.id);
if (new Date() < contest.startTime) {
  return res.json({ ...contest.toObject(), problems: [] });
}
const fullContest = await Contest.findById(req.params.id).populate('problems');
res.json(fullContest);
    /* const contest = await Contest.findById(req.params.id).populate('problems');
    
    if (!contest) {
      return res.status(404).json({ error: 'Contest not found' }); // 👈 Important check!
    }

    res.json(contest);*/
  } catch (err) {
    console.error('❌ Error fetching contest:', err.message); // optional
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/:contestId/submit/:problemId', verifyToken, async (req, res) => {
  const { contestId, problemId } = req.params;
  const { code, language } = req.body;
  const userId = req.user?.id;

  try {
    const problem = await Problems.findById(problemId);
    if (!problem) return res.status(404).json({ message: 'Problem not found' });

    const response = await axios.post('http://localhost:8000/run', {
      code,
      language,
      mode: 'submit',
      testCases: problem.testCases,
    });

    const { allPassed, results, runtime } = response.data;
    const verdict = allPassed ? 'Accepted' : 'Wrong Answer';

    await Submission.create({
      user: userId,
      problemId,
      problemTitle: problem.title,
      code,
      language,
      verdict,
      contestId, // ✅ This links the submission to the contest
      runtime: runtime || 'N/A',
    });

    return res.status(200).json({ verdict });
  } catch (error) {
    console.error('Contest Submission Error:', error.message);
    res.status(500).json({ message: 'Error during contest submission', error: error.message });
  }
});

router.get('/:contestId/leaderboard', async (req, res) => {
  const { contestId } = req.params;

  try {
    const submissions = await Submission.find({
      contestId,
      verdict: 'Accepted'
    }).populate('user');

    const userScores = {};

    submissions.forEach((submission) => {
      const userId = submission.user._id.toString();
      const problemId = submission.problemId.toString();

      if (!userScores[userId]) {
        userScores[userId] = {
          user: submission.user,
          solvedProblems: new Set(),
          totalSolved: 0,
        };
      }

      userScores[userId].solvedProblems.add(problemId);
    });

    const leaderboard = Object.values(userScores).map((entry) => ({
       name: `${entry.user.firstname} ${entry.user.lastname}`,
  totalSolved: entry.solvedProblems.size,
    }));

    // Sort leaderboard by problems solved descending
    leaderboard.sort((a, b) => b.totalSolved - a.totalSolved);

    return res.status(200).json(leaderboard);
  } catch (error) {
    console.error('Leaderboard error:', error.message);
    return res.status(500).json({ message: 'Error generating leaderboard' });
  }
});
export default router;
