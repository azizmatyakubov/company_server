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

        const isPasswordCorrect = await bcrypt.compare(password, foundUser.password);
        if(!isPasswordCorrect) return next(createHttpError(401, 'Invalid email or password'));

        const accessToken = jwt.sign(
            { id: foundUser._id, role: foundUser.role }, 
            process.env.ACCESS_TOKEN_SECRET, 
            { expiresIn: '15s' }
        );

        const refreshToken = jwt.sign(
            { id: foundUser._id, role: foundUser.role }, 
            process.env.REFRESH_TOKEN_SECRET, 
            { expiresIn: '1d' }
        );

        foundUser.refreshToken = refreshToken;
        await foundUser.save();
        
        res.cookie('refreshToken', refreshToken, { httpOnly: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });
        res.status(200).json({ accessToken });
    } catch (error) {
        console.log(error)
        next(error);
    }

}


export const register = async (req, res, next) => {
    try {
        const { email, password, name, surname, position } = req.body;
   
        const { error } = authValidator.register.body.validate(req.body);
        if(error) return next(createHttpError(400, error.details[0].message));
    
        const foundUser = await Users.findOne({ email });
        if(foundUser) return next(createHttpError(400, 'Email already exists'));
    
        // If user doesn't have password, we will use 'password' as default
        if(!password) req.body.password = 'password';
        
        const hashedPassword = await bcrypt.hash(req.body.password, 12);
  
        const newUser = await Users.create({ email, password: hashedPassword, name, surname, department: '6385c67e27f87f868369d38e', position, });

        res.status(200).json({id: newUser._id});
    } catch (error) {
        next(error);
    }
}


export const refreshToken = async (req, res, next) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if(!refreshToken) return next(createHttpError(401, 'Unauthorized'));
        
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        const foundUser = await Users.findById(decoded.id);
        if(!foundUser) return next(createHttpError(401, 'Unauthorized'));
        
        const accessToken = jwt.sign(
            { id: foundUser._id, role: foundUser.role }, 
            process.env.ACCESS_TOKEN_SECRET, 
            { expiresIn: '1h' }
        );
        
        res.status(200).json({ accessToken });
    } catch (error) {
        console.log(error)
        next(error);
    }
}

export const logout = async (req, res, next) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if(!refreshToken) return res.status(204).send();

        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        const foundUser = await Users.findById(decoded.id);
        if(!foundUser) return res.clearCookie('refreshToken', { httpOnly: true, sameSite: 'None', }).status(204).send();

        foundUser.refreshToken = null;
        await foundUser.save();

        res.clearCookie('refreshToken', { httpOnly: true, sameSite: 'None', }).status(204).send();
 
    } catch (error) {
        next(error);
    }
}

export const getMe = async (req, res, next) => {
    try {
        const foundUser = await Users.findById(req.user.id);
        if(!foundUser) return next(createHttpError(404, 'User not found'));
        
        res.status(200).json(foundUser);
    } catch (error) {
        next(error);
    }
}