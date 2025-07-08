import express from 'express';
import { verifyToken } from '../middleware/authmiddleware.js';
import {getAllProblems, getProblemById, addProblem,updateProblem, deleteProblem }from '../controllers/ProblemController.js';
import { submitSolution } from '../controllers/ProblemController.js';
import {isAdmin} from '../middleware/authmiddleware.js';
const router = express.Router();

router.get('/', getAllProblems);
router.get('/:id', getProblemById);
router.post('/add', verifyToken, isAdmin, addProblem);
router.post('/submit/:id', verifyToken,submitSolution);
router.put('/update/:id', verifyToken, isAdmin, updateProblem);
router.delete('/delete/:id', verifyToken, isAdmin, deleteProblem);

export default router;