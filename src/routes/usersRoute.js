import express from 'express';
import { getAllUsers, getUserById, updateUser, deleteUser, countUsers, changeDepartment  } from '../controllers/usersController.js';
import AuthMiddleware from '../middlewares/AuthMiddleware.js';
import { role } from '../middlewares/RoleMiddleware.js';

const usersRouter = express.Router();



usersRouter.get('/', getAllUsers )
usersRouter.put('/changeDepartment',AuthMiddleware, changeDepartment)
usersRouter.get('/countUsers', countUsers )
usersRouter.get('/:id', AuthMiddleware, role(['admin']), getUserById )
usersRouter.put('/:id', updateUser )
usersRouter.delete('/:id', deleteUser )





export default usersRouter;