import express from 'express';
import { loginUser, registerUser,logoutUser, getuserprofile } from '../controllers/userAuth.js';
import authenticateUser from '../middleware/authmiddle.js';
const router = express.Router();


router.post('/login', loginUser);
router.post('/register', registerUser);
router.post('/logout', logoutUser);
router.get('/profile',authenticateUser,getuserprofile);

export default router;