import express from 'express';
import { getAllUsers, getUserById } from '../controllers/usersController.js';

const usersRouter = express.Router();



usersRouter.get('/', getAllUsers )
usersRouter.get('/:id', getUserById )




export default usersRouter;