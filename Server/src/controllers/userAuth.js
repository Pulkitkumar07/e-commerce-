import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import asyncHandler from '../utils/asyncHandler.js';
import { sendError, sendSuccess } from '../utils/apiResponse.js';
import { createAuthToken, formatUser, getAuthCookieOptions } from '../utils/auth.js';

const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const isValidPassword = (password) => {
    return typeof password === 'string' && password.length >= 6;
};

export const registerUser = asyncHandler(async (req, res) => {

    const username = req.body.username?.trim();
    const email = req.body.email?.trim().toLowerCase();
    const { password } = req.body;

    if (!username || !email || !password) {
        return sendError(res, 'Username, email and password are required', 400);
    }

    if (!isValidEmail(email)) {
        return sendError(res, 'Please enter a valid email address', 400);
    }

    if (!isValidPassword(password)) {
        return sendError(res, 'Password must be at least 6 characters', 400);
    }

    const existingUser = await User.findOne({
        $or: [{ email }, { username }],
    });

    if (existingUser) {
        return sendError(res, 'Username or email already exists', 400);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
        username,
        email,
        password: hashedPassword,
    });

    await newUser.save();
    return sendSuccess(res, null, 'User registered successfully', 201);
});

export const loginUser = asyncHandler(async (req, res) => {
    const email = req.body.email?.trim().toLowerCase();
    const { password } = req.body;

    if (!email || !password) {
        return sendError(res, 'Email and password are required', 400);
    }

    if (!isValidEmail(email)) {
        return sendError(res, 'Please enter a valid email address', 400);
    }

    const user = await User.findOne({ email });

    if (!user) {
        return sendError(res, 'Invalid email or password', 401);
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return sendError(res, 'Invalid email or password', 401);
    }

    const token = createAuthToken(user);

    res.cookie('token', token, getAuthCookieOptions());

    return sendSuccess(res, { user: formatUser(user) }, 'Login successful');
});

export const logoutUser = (req, res) => {
    res.clearCookie('token', getAuthCookieOptions());
    return sendSuccess(res, null, 'Logged out successfully');
}

export const getuserprofile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id).select('-password');

    if (!user) {
        return sendError(res, 'User not found', 404);
    }

    return sendSuccess(res, { user: formatUser(user) }, 'User profile fetched');
});

export default { registerUser, loginUser, logoutUser };
