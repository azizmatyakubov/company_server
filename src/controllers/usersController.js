import mongoose from 'mongoose';
import Users from '../models/UsersModel.js';
import Departments from '../models/DepartmentsModel.js';
import createHttpError from 'http-errors';



export const getAllUsers = async (req, res, next) => {
    try {
        const users = await Users.find();
        res.send(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const getUserById = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) return next(createHttpError(400, `The id ${id} is not valid`));
    
        const user = await Users.findById(id);
        if(!user) return next(createHttpError(404, `User with id ${id} not found`));

        res.send(user);
    } catch (error) {
        next(error);
    }
}

export const updateUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) return next(createHttpError(400, `The id ${id} is not valid`));
    
        const user = await Users.findByIdAndUpdate(id, req.body, { new: true });
        if(!user) return next(createHttpError(404, `User with id ${id} not found`));

        // send updated user
        res.send(user);
    } catch (error) {
        next(error);
    }
}

export const deleteUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) return next(createHttpError(400, `The id ${id} is not valid`));

        const user = await Users.findByIdAndDelete(id);
        if(!user) return next(createHttpError(404, `User with id ${id} not found`));

        res.status(204).send();
    } catch (error) {
        next(error);
    }
}

export const countUsers = async (req, res, next) => {
    try {
        const users = await Users.countDocuments();
        res.status(200).send({ users });
    } catch (error) {
        next(error);
    }
}


export const changeDepartment = async (req, res, next) => {
    try {
        const { departmentName, userId } = req.query;
        if (!mongoose.Types.ObjectId.isValid(userId)) return next(createHttpError(400, `The id ${userId} is not valid`));

        const department = await Departments.findOne({ name: departmentName });
        if(!department) return next(createHttpError(404, `${departmentName} department not found`));

        const user = await Users.findById(userId);
        if(!user) return next(createHttpError(404, `Employee with id ${userId} not found`));

        // remove user from previous department
        const previousDepartment = await Departments.findOne({ employees: userId });
        if(previousDepartment) {
            previousDepartment.employees = previousDepartment.employees.filter(employee => employee != userId);
            await previousDepartment.save();
        }

        // add user to new department
        department.employees.push(userId);
        console.log(department._id)
        user.department = department._id;
        await user.save();
        await department.save();

        // send message
        res.status(200).send({ message: `Employee ${user.name} has been moved to ${department.name} department` });
        


    } catch (error) {
        next(error);
    }
}

    


