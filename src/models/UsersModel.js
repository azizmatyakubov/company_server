import mongoose from "mongoose";
const { Schema, model } = mongoose;

const usersSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
        enum: ["user", "admin", "superadmin"],
        default: "user",
    },
},
    {
        timestamps: true,
    }
);

export default model("Users", usersSchema);
