import mongoose from "mongoose";
const { Schema, model } = mongoose;

const usersSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    surname: {
        type: String,
        default: "",
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        default: "password",
    },
    role: {
        type: String,
        required: true,
        enum: ["user", "admin", "superadmin"],
        default: "user",
    },
    position: {
        type: String,
        required: true,
        enum: ["developer", "designer", "project manager"],
        default: "developer",
    }
},
    {
        timestamps: true,
    }
);

export default model("Users", usersSchema);
