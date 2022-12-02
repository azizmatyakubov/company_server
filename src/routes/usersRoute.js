import express from 'express';
import { getAllUsers, getUserById, updateUser, deleteUser, countUsers, changeDepartment, uploadAvatar  } from '../controllers/usersController.js';
import AuthMiddleware from '../middlewares/AuthMiddleware.js';
import { role } from '../middlewares/RoleMiddleware.js';
import { cloudinaryUploader } from '../middlewares/CloudinaryMiddleware.js';

const usersRouter = express.Router();



usersRouter.get('/', getAllUsers )
usersRouter.put('/changeDepartment',AuthMiddleware, changeDepartment)
usersRouter.get('/countUsers', countUsers )
usersRouter.get('/:id', AuthMiddleware, getUserById )
usersRouter.put('/:id', role(['admin']), updateUser )
usersRouter.delete('/:id', role(['admin']), deleteUser )
usersRouter.post('/uploadAvatar', AuthMiddleware, cloudinaryUploader, uploadAvatar )





export default usersRouter;