import express from 'express';
import { createNewDepartment, getAllDepartments, getDepartmentById, updateDepartment, deleteDepartment, getAllDepartmentByName  } from '../controllers/departmentsController.js';
import AuthMiddleware from '../middlewares/AuthMiddleware.js';
import { role } from '../middlewares/RoleMiddleware.js';

const departmentsRouter = express.Router();

departmentsRouter.post('/', AuthMiddleware, role(['admin']), createNewDepartment)
departmentsRouter.get('/', AuthMiddleware, role(['admin', 'user']), getAllDepartments )
departmentsRouter.get('/search', AuthMiddleware, role(['admin', 'user']), getAllDepartmentByName)
departmentsRouter.get('/:id', AuthMiddleware, role(['admin', 'user']), getDepartmentById )
departmentsRouter.put('/:id', AuthMiddleware, role(['admin']), updateDepartment )
departmentsRouter.delete('/:id', AuthMiddleware, role(['admin']), deleteDepartment )

export default departmentsRouter;
