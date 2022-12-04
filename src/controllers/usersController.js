import mongoose from 'mongoose';
import Users from '../models/UsersModel.js';
import Departments from '../models/DepartmentsModel.js';
import createHttpError from 'http-errors';
import pkg from 'json2csv';
const { Parser } = pkg;


export const getAllUsers = async (req, res, next) => {
    try {
        const users = await Users.find().populate('department');
        res.status(200).send(users);
    } catch (error) {
        console.log(error);
        next(createHttpError(500, 'Something went wrong'));
    }
}

export const getUserById = async (req, res, next) => {

    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) return next(createHttpError(400, `The id ${id} is not valid`));
    
        const user = await Users.findById(id).populate('department');
        if(!user) return next(createHttpError(404, `User with id ${id} not found`));

        res.status(200).send(user);
    } catch (error) {
        next(error);
    }
}

export const updateUser = async (req, res, next) => {
    // only able to update name, surname, email.
    try {
        const { id } = req.params;
        const { name, surname, email }  = req.body;
        if (!mongoose.Types.ObjectId.isValid(id)) return next(createHttpError(400, `The id ${id} is not valid`));
    
        const user = await Users.findByIdAndUpdate(id, { name, surname, email }, { new: true });
        if(!user) return next(createHttpError(404, `User with id ${id} not found`));

        res.status(200).json(user);
    } catch (error) {
        console.log(error);
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

export const uploadAvatar = async (req, res, next) => {
    try {
        const foundUser = await Users.findById(req.user.id);
        if(!foundUser) return next(createHttpError(404, `User with id ${req.user.id} not found`));

        foundUser.img = req.file.path;
        await foundUser.save();
    
        res.status(200).send({ message: 'Image uploaded successfully' });
    } catch (error) {
        console.log(error);
        next(error);
    }
}

export const downloadCsv = async (req, res, next) => {
    try {
        const users = await Users.find().populate('department');
        const fields = ['name', 'surname', 'email', 'role', 'department.name', 'position'];
        const opts = { fields };
        const parser = new Parser(opts);
        const csv = parser.parse(users);
        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', 'attachment; filename="users.csv"');
        res.status(200).send(csv);
    } catch (error) {
        console.log(error);
        next(error);
    }
}
    


