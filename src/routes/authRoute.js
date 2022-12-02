import express from 'express';
import passport from 'passport';
import { login, register, refreshToken, logout, getMe } from '../controllers/authController.js';
import AuthMiddleware from '../middlewares/AuthMiddleware.js';

const authRouter = express.Router();


// authRouter.post('/google', passport.authenticate('google', { scope: ['profile', 'email'] })); 
    
authRouter.get('/me', AuthMiddleware, getMe)
authRouter.post('/login', login);
authRouter.post('/register', register);
authRouter.get('/refresh', refreshToken);
authRouter.get('/logout', logout);

export default authRouter;