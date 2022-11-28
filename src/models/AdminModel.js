import mongoose from "mongoose";
const { Schema, model } = mongoose;

const adminSchema = new Schema({
    adminId: {
        type: Number,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    adminPassword: {
        type: String,
        required: true,
    },
    adminIs: {
        type: Boolean,
        required: true,
        default: true,
    },
},
    {
        timestamps: true,
    }
);


const Admin = model("Admin", adminSchema);
export default Admin; 
