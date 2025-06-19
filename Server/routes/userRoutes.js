import express from "express";
import User from "../models/User.js";
import {verifyToken} from "../middleware/authmiddleware.js";    

const router = express.Router();

router.get('/profile',verifyToken,async(req,res) =>{
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({user});
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

export default router;