import express from 'express';
import Problems from '../models/Problems.js'; 
import {getAllProblems, getProblemById, addProblem }from '../controllers/ProblemController.js';
import { get } from 'mongoose';
import { submitSolution } from '../controllers/ProblemController.js';
const router = express.Router();

router.get('/', getAllProblems);
router.get('/:id', getProblemById);
router.post('/add', addProblem);
router.post('/submit/:id', submitSolution);

export default router;