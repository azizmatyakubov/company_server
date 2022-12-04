import mongoose from "mongoose";
import createHttpError from "http-errors";
import Departments from "../models/DepartmentsModel.js";
import departmentsValidator from "../validators/departmentsValidator.js";


export const createNewDepartment = async (req, res, next) => {
    try {
        const { name, description } = req.body;

        const department = await Departments.findOne({ name });
        if(department) return next(createHttpError(409, 'Department already exists'));

        const newDepartment = new Departments({ name, description });
        const { _id } = await newDepartment.save();
        res.status(201).send('Department created successfully');
    } catch (error) {
        next(error);
    }
};

export const getAllDepartments = async (req, res, next) => {
    try {
        const departments = await Departments.find();
        res.send(departments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const getDepartmentById = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) return next(createHttpError(400, `The id ${id} is not valid`));

        const department = await Departments.findById(id);
        if(!department) return next(createHttpError(404, `Department with id ${id} not found`));

        res.send(department);
    } catch (error) {
        
    }
}

export const getAllDepartmentByName = async (req, res, next) => {
    try {
        const { name } = req.query;
        const department = await Departments.findOne({ name });

        if(!department) return next(createHttpError(404, `Department with name ${name} not found`));

        res.send(department);
    } catch (error) {
        console.log(error);
        next(error);
    }
}

export const updateDepartment = async (req, res, next) => {
    const { error } = departmentsValidator.update.body.validate(req.body);
    if(error) return next(createHttpError(400, error.details[0].message));
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) return next(createHttpError(400, `The id ${id} is not valid`));

        const foundDepartment = await Departments.findByIdAndUpdate(id, req.body, { new: true });
        if(!foundDepartment) return next(createHttpError(404, `Department with id ${id} not found`));

        res.status(200).send(foundDepartment);
    } catch (error) {
        
    }

}

export const deleteDepartment = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) return next(createHttpError(400, `The id ${id} is not valid`));

        const department = await Departments.findByIdAndDelete(id);
        if(!department) return next(createHttpError(404, `Department with id ${id} not found`));

        res.status(204).send();
    } catch (error) {
        next(error);
    }
}

