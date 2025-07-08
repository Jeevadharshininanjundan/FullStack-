import express from 'express';
import Submission from '../models/Submission.js';
import { verifyToken } from '../middleware/authmiddleware.js';

const router = express.Router();

router.get('/',verifyToken , async (req,res) => {
    try{
        const userId = req.user.id;
        const submissions = await Submission.find({userId}).sort ({timestamp: -1});
        res.status(200).json(submissions);
    }catch(err){
        res.status(500).json({message: 'Failed to fetch submisison'});
    }
});

export default router;