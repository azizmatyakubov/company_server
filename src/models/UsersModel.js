import mongoose from "mongoose";
const { Schema, model } = mongoose;

const usersSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    surname: {
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
        default: "password",
    },
    img: {
        type: String,
        default: 'https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg'
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
        default: "developer",
    },
    department: {
        type: Schema.Types.ObjectId,
        ref: "Departments",
        default: null,
    },
    refreshToken: {
        type: String,
        default: "",
    },
},
    {
        timestamps: true,
    }
);

// hide password, refreshToken and __v
usersSchema.methods.toJSON = function () {
    const userObject = this.toObject();
    delete userObject.__v;
    delete userObject.password;
    delete userObject.refreshToken;
    delete userObject.createdAt;
    delete userObject.updatedAt;
    return userObject;
};

export default model("Users", usersSchema);
