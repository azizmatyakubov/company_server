import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import createHttpError from 'http-errors';
import Users from '../models/UsersModel.js';
import authValidator from '../validators/authValidator.js';




export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const { error } = authValidator.login.body.validate(req.body);
        if(error) return next(createHttpError(400, error.details[0].message));

        const foundUser = await Users.findOne({ email });
        if(!foundUser) return next(createHttpError(401, 'Invalid email or password'));

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if(!isPasswordCorrect) return next(createHttpError(401, 'Invalid email or password'));

        const accessToken = jwt.sign(
            { id: foundUser._id, role: foundUser.role }, 
            process.env.ACCESS_TOKEN_SECRET, 
            { expiresIn: '1h' }
        );

        const refreshToken = jwt.sign(
            { id: foundUser._id, role: foundUser.role }, 
            process.env.REFRESH_TOKEN_SECRET, 
            { expiresIn: '1d' }
        );

        // Save refresh token to database
        foundUser.refreshToken = refreshToken;

        res.status(200).json({ token });
    } catch (error) {
        next(error);
    }

}


export const register = async (req, res, next) => {
    try {
        const { email, password, name, surname } = req.body;
   
        const { error } = authValidator.register.body.validate(req.body);
        if(error) return next(createHttpError(400, error.details[0].message));
    
        const foundUser = await Users.findOne({ email });
        if(foundUser) return next(createHttpError(400, 'Email already exists'));
    
        // If user doesn't have password, we will use 'password' as default
        if(!password) req.body.password = 'password';
        
        const hashedPassword = await bcrypt.hash(req.body.password, 12);
  
        const newUser = await Users.create({ email, password: hashedPassword, name, surname });

        res.status(200).json({id: newUser._id});
    } catch (error) {
        next(error);
    }
}


