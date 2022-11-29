import express from 'express';

import { createNewDepartment, getAllDepartments, getDepartmentById, updateDepartment, deleteDepartment, getAllDepartmentByName  } from '../controllers/departmentsController.js';

import { authenticateToken } from '../middlewares/jwt.js';

import { role } from '../middlewares/role.js';

const departmentsRouter = express.Router();



departmentsRouter.post('/', createNewDepartment)
departmentsRouter.get('/', getAllDepartments )
departmentsRouter.get('/search', getAllDepartmentByName)


departmentsRouter.post('employees')

departmentsRouter.get('/:id', authenticateToken, role(['admin']), getDepartmentById )
departmentsRouter.put('/:id', updateDepartment )
departmentsRouter.delete('/:id', deleteDepartment )


export default departmentsRouter;
