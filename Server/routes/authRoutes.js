import express from 'express';
import { login, register } from '../controllers/authController.js';
import {verifyToken} from '../middleware/authmiddleware.js'
const router = express.Router();

router.post('/register',register);
router.post('/login',login);

router.post('/logout', (req, res) => {
  res.clearCookie('token'); // Make sure this matches your cookie name
  return res.status(200).json({ message: 'Logged out successfully' });
});



export default router;