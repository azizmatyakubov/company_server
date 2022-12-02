import pkg from 'passport-google-oauth20';
const { Strategy: GoogleStrategy, VerifyCallback} = pkg;
import jwt from "jsonwebtoken";
import Users from "../models/UsersModel.js";
import dotenv from "dotenv";

dotenv.config();

const googleStrategy = new GoogleStrategy(
    {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL,
        scope: ['profile', 'email'],
    },

    async (req, accessToken, refreshToken, profile, done) => {
        try {
           const user = { googleId: profile.id,
            email: profile.emails[0].value,
            name: profile.name.givenName,
            surname: profile.name.familyName,
            img: profile.photos[0].value,
            role: "user",
            position: "developer",
            department: null,
        } 

        const existingUser = await Users.findOne({ email: profile.emails[0].value });
        if (!existingUser) {
            const newUser = await Users.create(user);
            const accessToken = jwt.sign(
                { id: newUser._id, role: newUser.role }, 
                process.env.ACCESS_TOKEN_SECRET, 
                { expiresIn: '1h' }
            )
            const refreshToken = jwt.sign(
                { id: newUser._id, role: newUser.role },
                process.env.REFRESH_TOKEN_SECRET,
                { expiresIn: '7d' }
            )
            newUser.refreshToken = refreshToken;
            await newUser.save();
            return done(null, { accessToken, refreshToken });
        } else {
            const accessToken = jwt.sign(
                { id: existingUser._id, role: existingUser.role },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '1h' }
            )
            const refreshToken = jwt.sign(
                { id: existingUser._id, role: existingUser.role },
                process.env.REFRESH_TOKEN_SECRET,
                { expiresIn: '7d' }
            )
            existingUser.refreshToken = refreshToken;
            await existingUser.save();
            return done(null, { accessToken, refreshToken });
        }

        } catch (error) {
            done(error);
        }
    }

);

export default googleStrategy;

