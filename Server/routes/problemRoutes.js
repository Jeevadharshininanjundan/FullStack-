import express from 'express';
import {getAllProblems, getProblemById, addProblem }from '../controllers/ProblemController.js';
import { submitSolution } from '../controllers/ProblemController.js';
const router = express.Router();

router.get('/', getAllProblems);
router.get('/:id', getProblemById);
router.post('/add', addProblem);
router.post('/submit/:id', submitSolution);

export default router;