import mongoose from "mongoose";
const  { Schema, model } = mongoose;

const departmentSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    employees: [{
        type: Schema.Types.ObjectId,
        ref: 'Users',
        default: []
    }],
}, { timestamps: true });


export default model('Departments', departmentSchema);