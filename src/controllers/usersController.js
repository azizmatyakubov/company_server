import mongoose from 'mongoose';
import Users from '../models/UsersModel.js';
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
        const { id } = req.params;
        const { departmentId } = req.body;
        if (!mongoose.Types.ObjectId.isValid(id)) return next(createHttpError(400, `The id ${id} is not valid`));
        if (!mongoose.Types.ObjectId.isValid(departmentId)) return next(createHttpError(400, `The id ${departmentId} is not valid`));

        const user = await Users.findByIdAndUpdate(id, { department : departmentId }, { new: true });
    } catch (error) {
        next(error);
} }
    


