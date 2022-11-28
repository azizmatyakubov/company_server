import express from 'express';
import { getAllUsers } from '../controllers/usersController';

const usersRouter = express.Router();



usersRouter.get('/', getAllUsers )




export default usersRouter;