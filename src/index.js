import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import listEndpoints from 'express-list-endpoints';
import cookieParser from 'cookie-parser';
import passport from "passport";

// import routes
import authRouter from './routes/authRoute.js';
import usersRouter from './routes/usersRoute.js';
import departmentsRouter from './routes/departmentsRoute.js';
// import error handlers
import { badRequestHandler, unauthorizedHandler, notFoundHandler, internalServerErrorHandler } from "./errorHandlers.js";


import { connectDB } from './config/db.js';
// corsOptions from './config/corsOptions.js';


import googleStrategy from './modules/GoogleStrategy.js';


const PORT = process.env.PORT || 5000;
const app = express();

// Load env vars
dotenv.config({ path: './config/config.env' });

// Connect to database
connectDB();

// Passport middleware
passport.use('google', googleStrategy)
app.use(passport.initialize())

// Middlewares
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser()) 


// Routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/departments', departmentsRouter);


// Error handlers
app.use(badRequestHandler)
app.use(unauthorizedHandler)
app.use(notFoundHandler)
app.use(internalServerErrorHandler)



app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
    console.table(listEndpoints(app));
});

