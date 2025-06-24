import express from 'express';
import Problems from '../models/Problems.js'; 
import {getAllProblems, getProblemById, addProblem }from '../controllers/ProblemController.js';
import { get } from 'mongoose';

const router = express.Router();

router.get('/', getAllProblems);
router.get('/:id', getProblemById);
router.post('/add', addProblem);

export default router;