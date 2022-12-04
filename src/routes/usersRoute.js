import express from 'express';
import { getAllUsers, getUserById, updateUser, deleteUser, countUsers, changeDepartment, uploadAvatar, downloadCsv, updateUserRole  } from '../controllers/usersController.js';
import AuthMiddleware from '../middlewares/AuthMiddleware.js';
import { adminOrOwner, onlyOwner, role } from '../middlewares/RoleMiddleware.js';
import { cloudinaryUploader } from '../middlewares/CloudinaryMiddleware.js';

const usersRouter = express.Router();

usersRouter.get('/', AuthMiddleware, getAllUsers )
usersRouter.put('/changeDepartment',AuthMiddleware, role(['admin']), changeDepartment)
usersRouter.get('/countUsers', AuthMiddleware, countUsers )
usersRouter.get('/csv', AuthMiddleware, role(['admin']), downloadCsv)
usersRouter.get('/:id', AuthMiddleware, adminOrOwner, getUserById )
usersRouter.put('/:id/role', AuthMiddleware, role(['admin']), updateUserRole)
usersRouter.put('/:id', AuthMiddleware, adminOrOwner, updateUser )
usersRouter.delete('/:id', AuthMiddleware, role(['admin']), deleteUser )
usersRouter.post('/avatar/:id', AuthMiddleware, adminOrOwner, cloudinaryUploader, uploadAvatar )

export default usersRouter;