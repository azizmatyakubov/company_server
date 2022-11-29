import express from 'express';
import { getAllUsers, getUserById, updateUser, deleteUser  } from '../controllers/usersController.js';
import { authenticateToken } from '../middlewares/jwt.js';
import { role } from '../middlewares/role.js';

const usersRouter = express.Router();



usersRouter.get('/', getAllUsers )
usersRouter.get('/:id', authenticateToken, role(['admin']), getUserById )
usersRouter.put('/:id', updateUser )
usersRouter.delete('/:id', deleteUser )





export default usersRouter;