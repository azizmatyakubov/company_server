import express from 'express';

import { createNewDepartment, getAllDepartments, getDepartmentById, updateDepartment, deleteDepartment, getAllDepartmentByName  } from '../controllers/departmentsController.js';

import { authenticateToken } from '../middlewares/jwt.js';

import { role } from '../middlewares/role.js';

const departmentsRouter = express.Router();



departmentsRouter.post('/', authenticateToken, role(['admin']), createNewDepartment)
departmentsRouter.get('/', authenticateToken, role(['admin', 'user']), getAllDepartments )
departmentsRouter.get('/search', authenticateToken, role(['admin', 'user']), getAllDepartmentByName)
departmentsRouter.get('/:id', authenticateToken, role(['admin', 'user']), getDepartmentById )
departmentsRouter.put('/:id', authenticateToken, role(['admin']), updateDepartment )
departmentsRouter.delete('/:id', authenticateToken, role(['admin']), deleteDepartment )


export default departmentsRouter;
