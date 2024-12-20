import express from 'express'
import { signup,login,logout,getMe,googleApiCallback,googleApi } from '../controllers/userController.js';
import { protectRoute } from '../middleware/protectRoute.js';
const router=express.Router();

router.get('/getme',protectRoute,getMe);
router.post('/signup',signup);
router.post('/login',login);
router.post('/logout',logout);
router.post('/googleSignup',googleApiCallback)
router.post('/googleLogin',googleApi)

export default router;