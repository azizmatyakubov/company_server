import express from 'express';
import { getAllUsers, getUserById, updateUser, deleteUser, countUsers, changeDepartment, uploadAvatar, downloadCsv  } from '../controllers/usersController.js';
import AuthMiddleware from '../middlewares/AuthMiddleware.js';
import { role } from '../middlewares/RoleMiddleware.js';
import { cloudinaryUploader } from '../middlewares/CloudinaryMiddleware.js';

const usersRouter = express.Router();



usersRouter.get('/', AuthMiddleware, getAllUsers )
usersRouter.put('/changeDepartment',AuthMiddleware, changeDepartment)
usersRouter.get('/countUsers', AuthMiddleware, countUsers )
usersRouter.get('/downloadCsv', downloadCsv)
usersRouter.get('/:id', AuthMiddleware, getUserById )
usersRouter.put('/:id', AuthMiddleware, role(['admin']), updateUser )
usersRouter.delete('/:id', AuthMiddleware, role(['admin']), deleteUser )
usersRouter.post('/uploadAvatar', AuthMiddleware, cloudinaryUploader, uploadAvatar )






export default usersRouter;