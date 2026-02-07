import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { get } from 'mongoose';



// User Registration Controller

export const registerUser = async (req, res) => {

    const { username, email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });

    } catch (error) {
        console.log("err :" + error);
        res.status(500).json({ message: 'Server error' });

    }

}

// User Login Controller
export const loginUser = async (req, res) => {
    const { email, password } = req.body;


    try {
        const user = await User.findOne({ email });


        if (!user) {
            return res.status(400).json({ message: 'Invalid email' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid password' });
        }
        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 604800000,
        });

        res.status(200).json({ user: { id: user._id, username: user.username, email: user.email } });

    } catch (error) {
        console.log("err :" + error);
        res.status(500).json({ message: 'Server error' });

    }

}

export const logoutUser = (req, res) => {
    res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
    });
    res.status(200).json({ message: 'Logged out successfully' });
}


export const getuserprofile = async (req, res) => {
    try {
        const user = await User.findById(req.userId).select('-password');
        console.log("user profile: " + user);
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ user });
    } catch (error) {
        console.log("err :" + error);
        res.status(500).json({ message: 'Server error' });
    }
}

export default { registerUser, loginUser, logoutUser };