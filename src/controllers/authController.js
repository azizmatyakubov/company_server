import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import authValidator from '../validators/authValidator.js';



export const login = async (req, res) => {
    try {
        // Validate request body
        const { error } = authValidator.login.body.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.message });
        }


    } catch (error) {
        res.status(500).json({ error: error.message });
    }

}

