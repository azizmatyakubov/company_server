import mongoose from "mongoose";
import createHttpError from "http-errors";
import Departments from "../models/DepartmentsModel.js";


export const createNewDepartment = async (req, res, next) => {
    try {
        const newDepartment = new Departments(req.body);
        const { _id } = await newDepartment.save();
        res.status(201).send({ id: _id });
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
        const departments = await Departments.find({ name: { $regex: name, $options: 'i' } });

        if(departments.length === 0) return next(createHttpError(404, `Department with name ${name} not found`));

        res.send(departments);
    } catch (error) {
        next(error);
    }
}

export const updateDepartment = async (req, res, next) => {}

export const deleteDepartment = async (req, res, next) => {}

export const countDepartments = async (req, res, next) => {}
