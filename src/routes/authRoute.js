import express from 'express';
import { login, register, refreshToken, logout } from '../controllers/authController.js';

const authRouter = express.Router();


authRouter.post('/login', login);
authRouter.post('/register', register);
authRouter.get('/refresh', refreshToken);
authRouter.get('/logout', logout);

export default authRouter;