import express from 'express';
import { getAllUsers, getUserById, updateUser, deleteUser  } from '../controllers/usersController.js';

const usersRouter = express.Router();



usersRouter.get('/', getAllUsers )
usersRouter.get('/:id', getUserById )
usersRouter.put('/:id', updateUser )
usersRouter.delete('/:id', deleteUser )





export default usersRouter;