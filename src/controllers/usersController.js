import mongoose from 'mongoose';
import Users from '../models/UsersModel.js';
import Departments from '../models/DepartmentsModel.js';
import createHttpError from 'http-errors';
import pkg from 'json2csv';
import usersValidator from '../validators/usersValidator.js';
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
    // only name, surname, email can be updated
    const { error } = usersValidator.updateUser.body.validate(req.body);
    if(error) return next(createHttpError(400, error.details[0].message));

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

export const updateUserRole = async (req, res, next) => {
    const { error } = usersValidator.updateUserRole.body.validate(req.body);
    if(error) return next(createHttpError(400, error.details[0].message));

    try {
        const { id } = req.params;
        const { role } = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) return next(createHttpError(400, `The id ${id} is not valid`));
        if (!role) return next(createHttpError(400, `The role is required`));
        const user = await Users.findByIdAndUpdate(id, { role },
            { new: true });
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

        await Departments.updateOne({ _id: user.department }, { $pull: { users: user._id } });
    
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
    const { error } = usersValidator.changeDepartment.body.validate(req.body);
    if(error) return next(createHttpError(400, error.details[0].message));
    try {
        const { id } = req.params;
        const { department } = req.body;
        if (!mongoose.Types.ObjectId.isValid(id)) return next(createHttpError(400, `The id ${id} is not valid`));

        const foundDepartment = await Departments.findOne({ name: department });
        if(!foundDepartment) return next(createHttpError(404, `${department} department not found`));

        const user = await Users.findById(id);
        if(!user) return next(createHttpError(404, `Employee with id ${id} not found`));

        // remove user from previous department
        if (user.department !== null) {
            const previousDepartment = await Departments.findOne({ employees: id });
            if(!previousDepartment)  return next(createHttpError(404, `Employee with id ${id} not found in any department`));
            previousDepartment.employees = previousDepartment.employees.filter(employee => employee != id);
            await previousDepartment.save();
        }

        foundDepartment.employees.push(id);
        user.department = foundDepartment._id;

        await user.save();
        await foundDepartment.save();

        // send message
        res.status(200).send({ message: `Employee ${user.name} has been moved to ${foundDepartment.name} department` });
        
    } catch (error) {
        console.log(error);
        next(error);
    }
}

export const uploadAvatar = async (req, res, next) => {
    try {
        const foundUser = await Users.findById(req.params.id);
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
    


