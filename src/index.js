import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import listEndpoints from 'express-list-endpoints';


// import routes
import usersRouter from './routes/usersRoute.js';
// import error handlers
import { badRequestHandler, unauthorizedHandler, notFoundHandler, internalServerErrorHandler } from "./errorHandlers.js";


import { connectDB } from './config/db.js';


const PORT = process.env.PORT || 5000;
const app = express();

// Load env vars
dotenv.config({ path: './config/config.env' });

// Connect to database
connectDB();


// Middlewares
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


// Routes
app.use('/api/v1/users', usersRouter);


// Error handlers
app.use(badRequestHandler)
app.use(unauthorizedHandler)
app.use(notFoundHandler)
app.use(internalServerErrorHandler)



app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
    console.table(listEndpoints(app));
});

