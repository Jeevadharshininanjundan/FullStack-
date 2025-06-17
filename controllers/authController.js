import bcrypt from 'bcrypt';
import User from '../models/User.js';

export const register = async (req, res) => {
    try{
        const { firstname,lastname, email, password } = req.body;
        if (!firstname || !lastname || !email || !password) {
            return res.status(400).json({ 
                message: 'All fields are required' });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        
        const newUser = new User({
            firstname,
            lastname,
            email,
            password: hashedPassword
        });

        await newUser.save();
        return res.status(201).json({ message: 'User registered successfully' });

    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export const login = async (req, res) => {
  try{
    const{email,password} = req.body;
    if(!email || !password) {
        return res.status(400).json({
            message: 'Email and password are required'
        })
    }

    const user = await User.findOne({ email });
    if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    return res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};